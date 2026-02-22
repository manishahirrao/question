// Silent email sender using FormSubmit.co
// Sends quiz answers to the configured email without user knowing

const TARGET_EMAIL = 'nikhilsonawane281@gmail.com'
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`

export async function sendAnswersToEmail(answers) {
    try {
        const answerEntries = Object.values(answers)
        let formattedAnswers = '📋 QUIZ ANSWERS RECEIVED\n\n'

        answerEntries.forEach((entry, index) => {
            const type = entry.type === 'mcq' ? '(MCQ)' : '(Text)'
            formattedAnswers += `Q${index + 1} ${type}: ${entry.question}\n`
            formattedAnswers += `Answer: ${entry.answer}\n\n`
        })

        formattedAnswers += `\n📅 Submitted at: ${new Date().toLocaleString()}`

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
        return data.success
    } catch (error) {
        return false
    }
}

export async function sendConfirmationToEmail(answers, choice) {
    try {
        const answerEntries = Object.values(answers)
        let message = '✅ FINAL RESULT\n\n'
        message += `Honest answer: ${choice === 'yes' ? '✅ YES - They said they answered correctly' : '❌ NO - They said they did not answer correctly'}\n\n`
        message += '─────────────────────\n\n'
        message += '📋 ALL ANSWERS:\n\n'

        answerEntries.forEach((entry, index) => {
            const type = entry.type === 'mcq' ? '(MCQ)' : '(Text)'
            message += `Q${index + 1} ${type}: ${entry.question}\n`
            message += `➜ ${entry.answer}\n\n`
        })

        message += `\n📅 Completed at: ${new Date().toLocaleString()}`

        const response = await fetch(FORMSUBMIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                _subject: `🏁 Quiz Complete - They said ${choice === 'yes' ? 'YES ✅' : 'NO ❌'}`,
                _template: 'box',
                message: message,
                _captcha: 'false',
            }),
        })

        const data = await response.json()
        return data.success
    } catch (error) {
        return false
    }
}
