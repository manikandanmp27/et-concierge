// Generate or retrieve session ID
function getSessionId() {
    let sid = localStorage.getItem('et_session_id');
    if (!sid) {
        sid = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('et_session_id', sid);
    }
    return sid;
}

const sessionId = getSessionId();

// DOM Elements
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const messagesContainer = document.getElementById('messages-container');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-chat-btn');
const profileDetails = document.getElementById('profile-details');
const recommendationsList = document.getElementById('recommendations-list');

// Define API base URL correctly based on your FastAPI hosting config.
// Using relative path assuming they are served from same origin or setup proxy.
// If backend is on 8000:
const API_BASE = 'http://localhost:8000/api';

// Utility to create a message element
function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar';
    avatarDiv.innerHTML = role === 'assistant' ? '<i class="ph ph-robot"></i>' : '<i class="ph ph-user"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    // Replace newlines with <br> for simple markdown handling
    contentDiv.innerHTML = text.replace(/\n/g, '<br>');
    
    msgDiv.appendChild(avatarDiv);
    msgDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Format the profile JSON nicely
function updateProfileUI(profile) {
    if (!profile || Object.keys(profile).length === 0) return;
    
    let html = '<div class="profile-grid">';
    
    const fields = [
        { key: 'role', label: 'Role' },
        { key: 'experience_level', label: 'Experience' },
        { key: 'financial_goals', label: 'Goal' },
        { key: 'location_tier', label: 'Location' }
    ];

    fields.forEach(f => {
        if (profile[f.key]) {
            html += `
                <div class="profile-item">
                    <div class="profile-label">${f.label}</div>
                    <div class="profile-value">${profile[f.key]}</div>
                </div>
            `;
        }
    });

    if (profile.interests && profile.interests.length > 0) {
        html += `
            <div class="profile-item">
                <div class="profile-label">Interests</div>
                <div class="tag-list">
                    ${profile.interests.map(i => `<span class="tag">${i}</span>`).join('')}
                </div>
            </div>
        `;
    }

    html += '</div>';
    profileDetails.innerHTML = html;
}

// Format recommendations
function updateRecommendationsUI(recs) {
    if (!recs || recs.length === 0) return;
    
    let html = '';
    recs.forEach(rec => {
        html += `
            <a href="${rec.url || '#'}" target="_blank" class="rec-card">
                <div class="rec-title">
                    ${rec.name}
                    <i class="ph ph-arrow-up-right"></i>
                </div>
                <div class="rec-reason">${rec.reason}</div>
            </a>
        `;
    });
    
    recommendationsList.innerHTML = html;
}

// Set sending state
function setLoading(isLoading) {
    if (isLoading) {
        sendBtn.disabled = true;
        sendBtn.classList.add('loading');
        chatInput.disabled = true;
    } else {
        sendBtn.disabled = false;
        sendBtn.classList.remove('loading');
        chatInput.disabled = false;
        chatInput.focus();
    }
}

// Fetch chat history and initial profile on load
async function fetchInitialData() {
    try {
        const res = await fetch(`${API_BASE}/profile/${sessionId}`);
        if (res.ok) {
            const data = await res.json();
            
            // Note: API CONTRACT says chat_history, but the actual memory_service returns messages under backend's doc.
            // Wait, the API_CONTRACT uses GET /api/profile/:id and says chat_history.
            // The memory_service returns `message_count`. There's no message array returned in /profile.
            // So we just load profile data here.
            
            if (data.profile && Object.keys(data.profile).length > 0) {
                updateProfileUI(data.profile);
            }
        }
    } catch (e) {
        console.error("Failed to fetch initial profile", e);
    }
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    chatInput.value = '';
    appendMessage('user', messageText);
    setLoading(true);

    try {
        const res = await fetch(`${API_BASE}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId, message: messageText })
        });
        
        if (!res.ok) throw new Error("API responded with an error");
        
        const data = await res.json();
        
        appendMessage('assistant', data.reply);
        
        if (data.profile) {
            updateProfileUI(data.profile);
        }
        
        if (data.recommendations) {
            updateRecommendationsUI(data.recommendations);
        }

    } catch (e) {
        appendMessage('assistant', "I'm having trouble connecting right now. Please try again later.");
        console.error("Chat error:", e);
    } finally {
        setLoading(false);
    }
});

// Clear chat
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('et_session_id');
    location.reload();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchInitialData();
});
