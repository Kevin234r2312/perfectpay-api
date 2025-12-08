export default function handler(request) {
  const token = process.env.PERFECTPAY_PERSONAL_TOKEN || null

  const body = JSON.stringify({
    ok: true,
    message: "Node.js Runtime 20 funcionando!",
    hasToken: !!token,
    tokenLength: token ? token.length : 0,
  })

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
