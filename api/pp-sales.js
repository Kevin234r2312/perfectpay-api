export default async function handler(req, res) {
  try {
    const token = process.env.PERFECTPAY_PERSONAL_TOKEN

    if (!token) {
      return res.status(500).json({
        ok: false,
        error: "Token da Perfect Pay não encontrado nas variáveis de ambiente.",
      })
    }

    // Filtros básicos de teste — depois a gente melhora
    const payload = {
      page: 1,
      // Exemplo de como filtrar por status:
      // sale_status_enum: 1, // 1 – aprovado, 2 – aguardando, etc. (depende da doc)
    }

    const response = await fetch(
      "https://app.perfectpay.com.br/api/v1/sales/get",
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

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "Erro ao chamar /sales/get na Perfect Pay",
        status: response.status,
        response: data,
      })
    }

    return res.status(200).json({
      ok: true,
      message: "Vendas carregadas com sucesso da Perfect Pay",
      perfectpay: data,
    })
  } catch (error) {
    console.error("Erro em /api/pp-sales:", error)

    return res.status(500).json({
      ok: false,
      error: "Erro inesperado na função /api/pp-sales",
      detail: error.message,
    })
  }
}
