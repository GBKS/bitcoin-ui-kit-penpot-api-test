export default defineEventHandler(async(event) => {
  const url = "https://design.penpot.app/api/rpc/command/get-project-files"

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Token "+process.env.PENPOT_ACCESS_TOKEN,
  }

  const params = {
    projectId: process.env.PENPOT_PROJECT_ID
  }

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params)
  }

  let data
  await $fetch(url, options).then((result) => {
    data = result
  })

  return {
    data
  }
})