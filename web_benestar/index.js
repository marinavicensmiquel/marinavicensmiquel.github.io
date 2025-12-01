import fetch from "node-fetch";

const PROJECT_ID = "benestarpwa";

export const sendPush = async (req, res) => {
  const accessToken = await getAccessToken();

  const message = {
    message: {
      topic: "all",
      notification: {
        title: "Benestar 🌿",
        body: "Recordatori automàtic cada 10 segons ⏱️"
      }
    }
  };

  const response = await fetch(`https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });

  const result = await response.text();
  console.log(result);
  res.send(result);
};

async function getAccessToken() {
  const { execSync } = await import("child_process");
  return execSync("gcloud auth application-default print-access-token").toString().trim();
}
