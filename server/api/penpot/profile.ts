export default defineEventHandler(async(event) => {
  const url = 'https://design.penpot.app/api/rpc/command/get-profile'

  const headers = {
    "Content-Type": "application/json",
    Authorization: 'Token '+process.env.PENPOT_ACCESS_TOKEN
  }

  let data = 'nothing'

  const test = await $fetch(url, { headers }).then((result) => {
    data = result
  })

  return {
    data
  }
})