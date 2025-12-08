module.exports = async (req, res) => {
  try {
    const token = process.env.PERFECTPAY_PERSONAL_TOKEN || null

    return res.status(200).json({
      ok: true,
      message: "Teste simples da API (sem axios)",
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
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
