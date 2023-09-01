import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import z from 'zod'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'

import { StructuredOutputParser } from 'langchain/output_parsers'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code the represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    // sentimentScore: z
    //   .number()
    //   .describe(
    //     'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
    //   ),
  })
)

const getPrompt = async (content: any) => {
  const formatted_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n {formatted_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formatted_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  console.log(input)
  return input

  // actual template
  // this is what you are, input variables
}

export const analyze = async (content) => {
  const input = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const results = await model.call(input)

  console.log('results', results)

  try {
    return parser.parse(results)
  } catch (e) {
    console.log(e)
  }
}

export const qa = async (question, entries) => {
  // turn everything into a langchain document

  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        id: entry.id,
        createdAt: entry.createdAt,
      },
    })
  })

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  // a chain allows you to chain multiple calls
  // together

  const chain = loadQARefineChain(model)

  // this will send you back some vectors
  const embeddings = new OpenAIEmbeddings()

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)

  const relevantDocs = await store.similaritySearch(question)

  const res = await chain.call({ input_documents: relevantDocs, question })

  return res.output_text
}
