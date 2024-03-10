<template>
  <section class="p-4 md:p-8">
    <h1 class="text-3xl py-4">Webhook Dev Server</h1>

    <div v-for="payload in sortedWebhookPayloads" :key="payload.id"
      class="bg-gray-100 text-gray-950 monospace text-xs p-4 md:p-8 rounded-lg shadow-md mb-4">
      <!-- <pre class="whitespace-pre-wrap">{{ JSON.stringify(payload.payload, null, 2) }}</pre> -->
      <VueJsonPretty :data="payload.payload" />
    </div>
  </section>
</template>

<script setup>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
/*
// Use the global state in this component
const store = useAppStore()
// Access the state variables and functions
const { activeItem, itemList, setActiveItem, addItem, removeItem } = store
*/

const supabase = useSupabaseClient()

const webhookPayloads = ref([])

// payloads sorted with the most recent first
const sortedWebhookPayloads = computed(() => {
  return webhookPayloads.value.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at)
  })
})

onMounted(async () => {
  const { data, error } = await supabase
    .from('webhook__payload')
    .select('*')
  if (error) {
    console.error('Error fetching webhook payloads', error)
  } else {
    webhookPayloads.value = data
  }

  supabase
    .channel('room1')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'webhook__payload' }, payload => {
      console.log('Change received!', payload)
      webhookPayloads.value.push(payload.new)
    })
    .subscribe()
})



</script>

<style></style>
