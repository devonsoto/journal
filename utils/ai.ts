import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import z from 'zod'

import { StructuredOutputParser } from 'langchain/output_parsers'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The mood of the person who wrote the journal entry.'),
    summary: z.string().describe('A quick summary of the entry.'),
    negative: z
      .boolean()
      .describe(
        'Is the journal entry negative? (i.e. does it contain negative emotions?)'
      ),
    subject: z.string().describe('The subject of the journal entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the journal entry. Example #0101fe for blue representing happiness.'
      ),
  })
)

const getPrompt = async (content) => {
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

  // console.log(input)
  return input

  // actual template
  // this is what you are, input variables
}

export const analyze = async (content) => {
  const input = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const results = await model.call(input)

  try {
    return parser.parse(results)
  } catch (e) {
    console.log(e)
  }
}
