export default async function handler(req, res) {
  try {
    const token = process.env.PERFECTPAY_PERSONAL_TOKEN

    if (!token) {
      return res.status(500).json({
        ok: false,
        error: "Token da Perfect Pay não encontrado nas variáveis de ambiente.",
      })
    }

    // Monta um body simples só para testar a listagem de assinaturas
    const payload = {
      page: 1,
      // se quiser, você pode ajustar esses filtros depois
      // subscription_status_enum: 2, // 1 teste, 2 ativa, 3 cancelada, 4 aguardando pagamento
    }

    const response = await fetch(
      "https://app.perfectpay.com.br/api/v1/subscriptions/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    )

    const data = await response.json()

    // Se a Perfect Pay responder com erro (ex.: token inválido)
    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "Erro ao chamar a API da Perfect Pay",
        status: response.status,
        response: data,
      })
    }

    // Sucesso – devolve os dados crus da Perfect Pay
    return res.status(200).json({
      ok: true,
      message: "Conexão com Perfect Pay funcionando",
      perfectpay: data,
    })
  } catch (error) {
    console.error("Erro na função pp-auth-test:", error)

    return res.status(500).json({
      ok: false,
      error: "Erro inesperado na função",
      detail: error.message,
    })
  }
}
