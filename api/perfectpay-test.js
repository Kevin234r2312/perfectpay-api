export default function handler(request) {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "API Perfect Pay - Teste OK (Node.js 20)",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}
