export default defineEventHandler(async(event) => {
  const url = "https://design.penpot.app/api/rpc/command/get-projects"

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Token "+process.env.PENPOT_ACCESS_TOKEN,
  }

  const params = {
    profileId: process.env.PENPOT_PROFILE_ID,
    teamId: process.env.PENPOT_TEAM_ID
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