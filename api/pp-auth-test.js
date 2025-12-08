import axios from "axios";

export default async function handler(req, res) {
  try {
    const token = process.env.PERFECTPAY_PERSONAL_TOKEN;

    if (!token) {
      return res.status(500).json({
        ok: false,
        error: "Token da Perfect Pay não encontrado nas variáveis de ambiente."
      });
    }

    const response = await axios.get(
      "https://app.perfectpay.com.br/api/v1/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return res.status(200).json({
      ok: true,
      message: "Token válido! Conexão com Perfect Pay funcionando.",
      data: response.data,
    });

  } catch (error) {
    console.error("Erro na função:", error);

    return res.status(500).json({
      ok: false,
      error: "Erro ao comunicar com a API da Perfect Pay",
      detail: error?.response?.data || error.message,
    });
  }
}
