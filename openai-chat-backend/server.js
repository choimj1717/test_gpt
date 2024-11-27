require('dotenv').config(); // .env 파일에서 환경 변수 불러오기
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json()); // JSON 요청을 처리하도록 설정

// 환경 변수에서 OpenAI API 키 로드
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// OpenAI API 요청을 처리하는 엔드포인트 생성
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body; // 클라이언트에서 받은 메시지

        // OpenAI API 호출
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 1000,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        // 응답 결과 클라이언트로 전송
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'API 요청 중 오류가 발생했습니다.' });
    }
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});