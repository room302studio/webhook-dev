// use dotenv for environment variables
import dotenv from 'dotenv'
dotenv.config()
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { data, error } = await supabase
    .from('webhook__payload')
    .insert([{ payload: body }])

  if (error) {
    console.error('Error inserting webhook payload:', error)
    return new Response('Error ' + JSON.stringify(error), { status: 500 })
  }

  return new Response('Success ' + JSON.stringify(data), { status: 200 })
})
