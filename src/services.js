
class FetchAPI {
    async getTimeslots() {
        const response = await fetch(`http://localhost:3000/slots`)
        if (!response.ok) {
            console.error('Network error', response.status)
        }
        return await response.json()
    }

    async updateScheduledMeeting(scheduledMeeting) {
        const response = await fetch('http://localhost:3000/scheduledMeeting', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduledMeeting),
        })
        if (!response.ok) {
            console.error('Network error', response.status)
        }
        return await response.json()
    }

    async getScheduledMeetingDate() {
        const response = await fetch(`http://localhost:3000/scheduledMeeting`)
        if (!response.ok) {
            console.error('Network error', response.status)
        }
        return await response.json()
    }

    async cancelScheduledMeeting() {
        const scheduledMeeting = {
            datetime: '',
            timezone: ''
        }
        const response = await fetch('http://localhost:3000/scheduledMeeting', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduledMeeting),
        })
        if (!response.ok) {
            console.error('Network error', response.status)
        }
        return await response.json()
    }
}

export const fetchAPI = new FetchAPI()
