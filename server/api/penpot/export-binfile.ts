export default defineEventHandler(async(event) => {
  const url = "https://design.penpot.app/api/rpc/command/export-binfile"

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Token "+process.env.PENPOT_ACCESS_TOKEN,
  }

  const params = {
    profileId,
    fileId: process.env.PENPOT_FILE_ID,
    includeLibraries: false,
    embedAssets: false
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