// SAI AI Trainer Fitness Assessment Platform - JavaScript

// Application State
let currentUser = null;
let currentUserType = null;
let exerciseTimer = null;
let currentExercise = null;
let dailyTipIndex = 0;

// AI Trainer Application Data
const aiTrainerData = {
  welcomeMessages: [
    "Welcome back, {name}! 💪",
    "Ready to crush your goals, {name}? 🔥",
    "Let's make today count, {name}! ⚡",
    "Time to level up, {name}! 🚀"
  ],
  motivationalQuotes: [
    "Ready to push your limits and achieve new personal bests?",
    "Every champion was once a beginner who refused to give up!",
    "Your only limit is your mind. Break through it today!",
    "Progress, not perfection. Every step counts!"
  ],
  dailyTips: [
    {
      title: "Master Your Form",
      content: "Focus on perfecting your technique today. Slow down each movement and ensure proper alignment. Quality over quantity builds strength and prevents injury. Remember, every champion starts with the basics—refine your skills, and the results will follow. Embrace the process!"
    },
    {
      title: "Consistency Beats Intensity",
      content: "Regular moderate training beats sporadic intense sessions. Build a sustainable routine that you can maintain long-term for better results and reduced injury risk."
    },
    {
      title: "Recovery is Growth",
      content: "Your muscles grow during rest, not just during exercise. Ensure adequate sleep and recovery time between intense training sessions for optimal performance."
    },
    {
      title: "Hydration for Performance",
      content: "Proper hydration improves performance, reduces fatigue, and aids recovery. Drink water before, during, and after your training sessions."
    },
    {
      title: "Mental Training Matters",
      content: "Visualization and mental preparation are as important as physical training. Picture yourself succeeding before you start your session."
    }
  ],
  performanceLevels: [
    {level: "Beginner", category: "General Fitness", minScore: 0, maxScore: 40},
    {level: "Intermediate", category: "Athletic Development", minScore: 41, maxScore: 70},
    {level: "Advanced", category: "Elite Performance", minScore: 71, maxScore: 90},
    {level: "Expert", category: "Championship Level", minScore: 91, maxScore: 100}
  ],
  performanceRatings: [
    {rating: "Excellent", minPercent: 85, color: "#4CAF50"},
    {rating: "Very Good", minPercent: 75, color: "#8BC34A"},
    {rating: "Good", minPercent: 65, color: "#FFC107"},
    {rating: "Needs Improvement", minPercent: 50, color: "#FF9800"},
    {rating: "Poor", minPercent: 0, color: "#F44336"}
  ],
  sampleUserData: {
    name: "Rajesh Kumar",
    avatar: "https://via.placeholder.com/40x40/4285f4/ffffff?text=RK",
    totalSessions: 15,
    weeklyProgress: 5,
    avgPerformance: 78,
    currentLevel: "Intermediate",
    currentCategory: "Athletic Development",
    dailyGoal: "Complete 1 training session",
    goalProgress: 60,
    recentSessions: [
      {
        id: 1,
        date: "2025-09-24",
        exercises: ["Push-ups", "Squats", "Plank"],
        duration: "45 mins",
        performance: 82,
        type: "Strength Training"
      },
      {
        id: 2,
        date: "2025-09-23",
        exercises: ["Sprint", "Jumping Jacks", "Burpees"],
        duration: "30 mins", 
        performance: 75,
        type: "Cardio Blast"
      },
      {
        id: 3,
        date: "2025-09-22",
        exercises: ["Flexibility Test", "Yoga Flow"],
        duration: "25 mins",
        performance: 70,
        type: "Flexibility & Recovery"
      }
    ]
  },
  exercises: [
    {id: 1, name: "Sit-ups", icon: "🏃‍♀️", category: "Core Strength", duration: "60 seconds"},
    {id: 2, name: "Push-ups", icon: "💪", category: "Upper Body", duration: "60 seconds"},
    {id: 3, name: "Squats", icon: "🦵", category: "Lower Body", duration: "60 seconds"},
    {id: 4, name: "Burpees", icon: "🤸‍♀️", category: "Full Body", duration: "60 seconds"},
    {id: 5, name: "Plank Hold", icon: "🧘‍♀️", category: "Core Strength", duration: "Max time"},
    {id: 6, name: "Shuttle Run", icon: "🏃‍♂️", category: "Agility", duration: "30 seconds"},
    {id: 7, name: "Jumping Jacks", icon: "🤾‍♀️", category: "Cardio", duration: "60 seconds"},
    {id: 8, name: "Sprint", icon: "🏃‍♂️", category: "Speed", duration: "100m"},
    {id: 9, name: "Lunges", icon: "🦵", category: "Lower Body", duration: "60 seconds"},
    {id: 10, name: "Skipping", icon: "🪀", category: "Cardio", duration: "60 seconds"}
  ],
  badges: [
    {name: "Consistency Champion", icon: "🔥", requirement: "7 day streak", color: "#FF4500"},
    {name: "Performance Beast", icon: "💪", requirement: "85%+ avg performance", color: "#8B4513"},
    {name: "Speed Demon", icon: "⚡", requirement: "Excellent sprint times", color: "#00CED1"},
    {name: "Endurance Master", icon: "🏃‍♂️", requirement: "Great endurance scores", color: "#32CD32"}
  ],
  adminCredentials: {
    username: "sai_admin",
    password: "SAI@2025"
  },
  aiResponses: [
    "Great question! Focus on maintaining proper form throughout your workout. Quality over quantity always wins!",
    "Remember to warm up properly before intense exercises. A good warm-up prevents injuries and improves performance.",
    "Nutrition plays a huge role in fitness. Make sure you're fueling your body with the right nutrients.",
    "Don't forget about recovery! Your muscles grow during rest, not just during exercise.",
    "Consistency is key. Even 15-20 minutes of daily activity can make a significant difference over time.",
    "Listen to your body. If you feel pain (not to be confused with muscle fatigue), take a break.",
    "Set specific, measurable goals. Instead of 'get fit', aim for 'complete 50 push-ups without stopping'.",
    "Track your progress! Seeing improvements over time is incredibly motivating."
  ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  showPage('landingPage');
  rotateDailyTip();
  // Rotate daily tip every 10 seconds for demo purposes
  setInterval(rotateDailyTip, 10000);
}

// Navigation Functions
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

function showLogin(type) {
  currentUserType = type;
  const modal = document.getElementById('loginModal');
  const title = document.getElementById('loginTitle');
  const userExtras = document.getElementById('userLoginExtras');
  
  if (type === 'admin') {
    title.textContent = 'Admin Login';
    userExtras.classList.add('hidden');
    document.getElementById('loginUsername').placeholder = 'Admin Username';
  } else {
    title.textContent = 'User Login';
    userExtras.classList.remove('hidden');
    document.getElementById('loginUsername').placeholder = 'Email';
  }
  
  modal.classList.remove('hidden');
  document.getElementById('loginUsername').focus();
}

function hideLogin() {
  document.getElementById('loginModal').classList.add('hidden');
  document.getElementById('loginForm').reset();
}

function showSignup() {
  hideLogin();
  document.getElementById('signupModal').classList.remove('hidden');
  document.getElementById('signupName').focus();
}

function hideSignup() {
  document.getElementById('signupModal').classList.add('hidden');
  document.getElementById('signupForm').reset();
}

// Authentication Functions
function handleLogin(event) {
  event.preventDefault();
  showLoading();
  
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  setTimeout(() => {
    if (currentUserType === 'admin') {
      if (username === aiTrainerData.adminCredentials.username && password === aiTrainerData.adminCredentials.password) {
        currentUser = { type: 'admin', name: 'SAI Administrator' };
        hideLoading();
        hideLogin();
        showAdminDashboard();
        showToast('Welcome, Admin!', 'success');
      } else {
        hideLoading();
        showToast('Invalid admin credentials', 'error');
      }
    } else {
      // Simulate user login
      if (username && password) {
        const userData = aiTrainerData.sampleUserData;
        currentUser = {
          type: 'user',
          id: Date.now(),
          name: userData.name,
          email: username,
          profile: userData,
          assessments: userData.recentSessions || [],
          badges: ['Consistency Champion', 'Performance Beast']
        };
        hideLoading();
        hideLogin();
        showAITrainerDashboard();
        showToast(`Welcome back, ${currentUser.name}!`, 'success');
      } else {
        hideLoading();
        showToast('Please enter valid credentials', 'error');
      }
    }
  }, 1500);
}

function handleSignup(event) {
  event.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  
  if (password !== confirmPassword) {
    showToast('Passwords do not match', 'error');
    return;
  }
  
  showLoading();
  
  setTimeout(() => {
    currentUser = {
      type: 'user',
      id: Date.now(),
      name: name,
      email: email,
      profile: {
        name: name,
        totalSessions: 0,
        avgPerformance: 50,
        currentLevel: "Beginner",
        currentCategory: "General Fitness"
      },
      assessments: [],
      badges: ['Beginner']
    };
    
    hideLoading();
    hideSignup();
    showAITrainerDashboard();
    showToast(`Account created successfully! Welcome, ${name}!`, 'success');
  }, 1500);
}

function handleSocialLogin(provider) {
  showLoading();
  
  setTimeout(() => {
    const userData = aiTrainerData.sampleUserData;
    currentUser = {
      type: 'user',
      id: Date.now(),
      name: userData.name,
      email: `user@${provider.toLowerCase()}.com`,
      profile: userData,
      assessments: userData.recentSessions || [],
      badges: ['Consistency Champion']
    };
    
    hideLoading();
    hideLogin();
    showAITrainerDashboard();
    showToast(`Logged in via ${provider}!`, 'success');
  }, 1500);
}

function logout() {
  currentUser = null;
  currentUserType = null;
  showPage('landingPage');
  showToast('Logged out successfully', 'success');
}

// AI Trainer Dashboard Functions
function showAITrainerDashboard() {
  showPage('userDashboard');
  updateWelcomeSection();
  updatePerformanceMetrics();
  updateRecentSessions();
  showAISection('dashboard');
  updateSidebarUser();
  rotateDailyTip();
}

function updateWelcomeSection() {
  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeSubtitle = document.getElementById('welcomeSubtitle');
  
  if (welcomeTitle && currentUser) {
    const randomMessage = aiTrainerData.welcomeMessages[Math.floor(Math.random() * aiTrainerData.welcomeMessages.length)];
    welcomeTitle.textContent = randomMessage.replace('{name}', currentUser.name);
  }
  
  if (welcomeSubtitle) {
    const randomQuote = aiTrainerData.motivationalQuotes[Math.floor(Math.random() * aiTrainerData.motivationalQuotes.length)];
    welcomeSubtitle.textContent = randomQuote;
  }
}

function updateSidebarUser() {
  const sidebarUserName = document.getElementById('sidebarUserName');
  if (sidebarUserName && currentUser) {
    sidebarUserName.textContent = currentUser.name;
  }
}

function rotateDailyTip() {
  const tipTitle = document.getElementById('tipTitle');
  const tipContent = document.getElementById('tipContent');
  
  if (tipTitle && tipContent) {
    const tip = aiTrainerData.dailyTips[dailyTipIndex];
    tipTitle.textContent = tip.title;
    tipContent.textContent = tip.content;
    
    dailyTipIndex = (dailyTipIndex + 1) % aiTrainerData.dailyTips.length;
  }
}

function updatePerformanceMetrics() {
  if (!currentUser || !currentUser.profile) return;
  
  const profile = currentUser.profile;
  
  // Update total sessions
  const totalSessions = document.getElementById('totalSessions');
  if (totalSessions) {
    totalSessions.textContent = profile.totalSessions || 0;
  }
  
  // Update average performance
  const avgPerformance = document.getElementById('avgPerformance');
  const performanceRating = document.getElementById('performanceRating');
  if (avgPerformance) {
    avgPerformance.textContent = (profile.avgPerformance || 0) + '%';
  }
  
  if (performanceRating) {
    const rating = getPerformanceRating(profile.avgPerformance || 0);
    performanceRating.textContent = rating.rating;
    performanceRating.style.color = rating.color;
  }
  
  // Update athletic level
  const athleticLevel = document.getElementById('athleticLevel');
  const athleticCategory = document.getElementById('athleticCategory');
  if (athleticLevel) {
    athleticLevel.textContent = profile.currentLevel || 'Beginner';
  }
  if (athleticCategory) {
    athleticCategory.textContent = profile.currentCategory || 'General Fitness';
  }
}

function getPerformanceRating(percentage) {
  for (const rating of aiTrainerData.performanceRatings) {
    if (percentage >= rating.minPercent) {
      return rating;
    }
  }
  return aiTrainerData.performanceRatings[aiTrainerData.performanceRatings.length - 1];
}

function updateRecentSessions() {
  const sessionsList = document.getElementById('recentSessionsList');
  if (!sessionsList || !currentUser || !currentUser.assessments) return;
  
  sessionsList.innerHTML = '';
  
  const sessions = currentUser.assessments.slice(0, 3); // Show only 3 recent sessions
  
  sessions.forEach(session => {
    const sessionItem = document.createElement('div');
    sessionItem.className = 'session-item';
    
    sessionItem.innerHTML = `
      <div class="session-info">
        <h4 class="session-title">${session.type}</h4>
        <p class="session-details">${session.exercises.join(', ')} • ${session.duration}</p>
      </div>
      <div class="session-performance">
        <div class="session-score">${session.performance}%</div>
        <div class="session-date">${formatDate(session.date)}</div>
      </div>
    `;
    
    sessionsList.appendChild(sessionItem);
  });
  
  if (sessions.length === 0) {
    sessionsList.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: var(--space-20);">No recent sessions. Start your fitness journey today!</p>';
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
}

// AI Trainer Navigation
function showAISection(sectionName) {
  // Update navigation
  document.querySelectorAll('.ai-sidebar .nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
  if (activeNavItem) {
    activeNavItem.classList.add('active');
  }
  
  // Show section
  document.querySelectorAll('.ai-section').forEach(section => {
    section.classList.remove('active');
  });
  
  const targetSection = document.getElementById(sectionName + 'Section');
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Load section-specific content
  switch(sectionName) {
    case 'live-workout':
      renderExerciseGrid();
      break;
    case 'progress':
      renderProgressCharts();
      renderProgressBadges();
      break;
    case 'training-library':
      renderTrainingLibrary();
      break;
    case 'ai-coach-chat':
      initializeChat();
      break;
  }
}

function startRecordSession() {
  showAISection('live-workout');
  showToast('Select an exercise to begin your session!', 'success');
}

// Exercise Functions
function renderExerciseGrid() {
  const grid = document.getElementById('exerciseGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  aiTrainerData.exercises.forEach(exercise => {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.onclick = () => startExerciseAssessment(exercise);
    
    card.innerHTML = `
      <div class="exercise-card-icon">${exercise.icon}</div>
      <h4>${exercise.name}</h4>
      <div class="exercise-card-category">${exercise.category}</div>
      <div class="exercise-card-duration">${exercise.duration}</div>
    `;
    
    grid.appendChild(card);
  });
}

function startExerciseAssessment(exercise) {
  currentExercise = exercise;
  
  document.getElementById('exerciseTitle').textContent = exercise.name + ' Assessment';
  document.getElementById('exerciseIcon').textContent = exercise.icon;
  document.getElementById('exerciseName').textContent = exercise.name;
  document.getElementById('exerciseCategory').textContent = exercise.category;
  document.getElementById('exerciseDuration').textContent = exercise.duration;
  
  document.getElementById('exerciseModal').classList.remove('hidden');
  resetExerciseState();
}

function hideExerciseModal() {
  document.getElementById('exerciseModal').classList.add('hidden');
  if (exerciseTimer) {
    clearInterval(exerciseTimer);
    exerciseTimer = null;
  }
  resetExerciseState();
}

function resetExerciseState() {
  document.getElementById('startExerciseBtn').classList.remove('hidden');
  document.getElementById('stopExerciseBtn').classList.add('hidden');
  document.getElementById('exerciseFeedback').classList.add('hidden');
  document.getElementById('repsCount').textContent = '0';
  document.getElementById('formScore').textContent = '-';
  document.getElementById('timeRemaining').textContent = '60s';
}

function startExercise() {
  document.getElementById('startExerciseBtn').classList.add('hidden');
  document.getElementById('stopExerciseBtn').classList.remove('hidden');
  document.getElementById('exerciseFeedback').classList.remove('hidden');
  
  let timeLeft = 60;
  let reps = 0;
  let formScore = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
  
  exerciseTimer = setInterval(() => {
    timeLeft--;
    reps += Math.random() > 0.7 ? 1 : 0; // Simulate rep detection
    
    document.getElementById('timeRemaining').textContent = timeLeft + 's';
    document.getElementById('repsCount').textContent = reps;
    document.getElementById('formScore').textContent = formScore + '%';
    
    if (timeLeft <= 0) {
      stopExercise();
    }
  }, 1000);
  
  showToast('AI analysis started! Follow proper form for best results.', 'success');
}

function stopExercise() {
  if (exerciseTimer) {
    clearInterval(exerciseTimer);
    exerciseTimer = null;
  }
  
  const reps = parseInt(document.getElementById('repsCount').textContent);
  const formScore = document.getElementById('formScore').textContent;
  const overallScore = Math.floor(Math.random() * 30) + 70; // Random score 70-100
  
  // Save assessment result
  if (!currentUser.assessments) {
    currentUser.assessments = [];
  }
  
  const newAssessment = {
    id: Date.now(),
    date: new Date().toISOString(),
    exercises: [currentExercise.name],
    duration: '60s',
    performance: overallScore,
    type: currentExercise.category,
    reps: reps,
    formScore: formScore
  };
  
  currentUser.assessments.unshift(newAssessment);
  
  // Update user profile
  if (currentUser.profile) {
    currentUser.profile.totalSessions = (currentUser.profile.totalSessions || 0) + 1;
    
    // Update average performance
    const totalPerformance = currentUser.assessments.reduce((sum, assessment) => sum + assessment.performance, 0);
    currentUser.profile.avgPerformance = Math.round(totalPerformance / currentUser.assessments.length);
    
    // Update level based on performance
    const avgPerf = currentUser.profile.avgPerformance;
    for (const level of aiTrainerData.performanceLevels) {
      if (avgPerf >= level.minScore && avgPerf <= level.maxScore) {
        currentUser.profile.currentLevel = level.level;
        currentUser.profile.currentCategory = level.category;
        break;
      }
    }
  }
  
  // Award badges based on performance
  if (overallScore > 85 && !currentUser.badges.includes('Performance Beast')) {
    currentUser.badges.push('Performance Beast');
    showToast('New badge unlocked: Performance Beast! 💪', 'success');
  }
  
  setTimeout(() => {
    hideExerciseModal();
    showToast(`Assessment completed! Score: ${overallScore}% | Reps: ${reps}`, 'success');
    updatePerformanceMetrics();
    updateRecentSessions();
  }, 1000);
}

// Progress and Charts
function renderProgressCharts() {
  setTimeout(() => {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    
    // Generate sample progress data
    const data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [{
        label: 'Performance Score',
        data: [55, 62, 68, 72, 76, currentUser?.profile?.avgPerformance || 78],
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1FB8CD',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    };
    
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        elements: {
          point: {
            hoverRadius: 8
          }
        }
      }
    });
  }, 500);
}

function renderProgressBadges() {
  const container = document.getElementById('progressBadges');
  if (!container || !currentUser?.badges) return;
  
  container.innerHTML = '';
  
  currentUser.badges.forEach(badgeName => {
    const badge = aiTrainerData.badges.find(b => b.name === badgeName);
    if (badge) {
      const badgeEl = document.createElement('div');
      badgeEl.className = 'badge-item';
      badgeEl.innerHTML = `
        <span class="badge-icon">${badge.icon}</span>
        <div>
          <div style="font-weight: 600;">${badge.name}</div>
          <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">${badge.requirement}</div>
        </div>
      `;
      container.appendChild(badgeEl);
    }
  });
  
  // Add available badges as grayed out
  const availableBadges = aiTrainerData.badges.filter(b => !currentUser.badges.includes(b.name));
  availableBadges.forEach(badge => {
    const badgeEl = document.createElement('div');
    badgeEl.className = 'badge-item';
    badgeEl.style.opacity = '0.4';
    badgeEl.innerHTML = `
      <span class="badge-icon">${badge.icon}</span>
      <div>
        <div style="font-weight: 600;">${badge.name}</div>
        <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">${badge.requirement}</div>
      </div>
    `;
    container.appendChild(badgeEl);
  });
}

// Training Library
function renderTrainingLibrary() {
  const libraryGrid = document.getElementById('libraryGrid');
  if (!libraryGrid) return;
  
  libraryGrid.innerHTML = '';
  
  aiTrainerData.exercises.forEach(exercise => {
    const item = document.createElement('div');
    item.className = 'exercise-card';
    item.style.cursor = 'pointer';
    
    item.innerHTML = `
      <div class="exercise-card-icon">${exercise.icon}</div>
      <h4>${exercise.name}</h4>
      <div class="exercise-card-category">${exercise.category}</div>
      <div class="exercise-card-duration">${exercise.duration}</div>
      <div style="margin-top: 16px;">
        <button class="btn btn--outline btn--sm" onclick="viewExerciseDetails('${exercise.name}')">
          <i class="fas fa-info-circle"></i> Learn More
        </button>
      </div>
    `;
    
    libraryGrid.appendChild(item);
  });
}

function viewExerciseDetails(exerciseName) {
  const exercise = aiTrainerData.exercises.find(e => e.name === exerciseName);
  if (exercise) {
    showToast(`${exercise.name}: ${exercise.category} exercise for ${exercise.duration}`, 'info');
  }
}

// AI Coach Chat
function initializeChat() {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }
}

function sendChatMessage() {
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  
  if (!chatInput || !chatMessages) return;
  
  const message = chatInput.value.trim();
  if (!message) return;
  
  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'chat-message user';
  userMessage.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">
      <div class="message-text">${message}</div>
      <div class="message-time">Just now</div>
    </div>
  `;
  chatMessages.appendChild(userMessage);
  
  // Clear input
  chatInput.value = '';
  
  // Simulate AI response
  setTimeout(() => {
    const aiResponse = aiTrainerData.aiResponses[Math.floor(Math.random() * aiTrainerData.aiResponses.length)];
    const aiMessage = document.createElement('div');
    aiMessage.className = 'chat-message ai';
    aiMessage.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="message-text">${aiResponse}</div>
        <div class="message-time">Just now</div>
      </div>
    `;
    chatMessages.appendChild(aiMessage);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Admin Dashboard Functions
function showAdminDashboard() {
  showPage('adminDashboard');
  showAdminSection('overview');
}

function showAdminSection(section) {
  // Update navigation
  document.querySelectorAll('#adminDashboard .nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target?.classList.add('active');
  
  // Show section
  document.querySelectorAll('#adminDashboard .dashboard-section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(section + 'Section').classList.add('active');
}

// Utility Functions
function showLoading() {
  document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loadingSpinner').classList.add('hidden');
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  toastMessage.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    hideToast();
  }, 5000);
}

function hideToast() {
  document.getElementById('toast').classList.add('hidden');
}

// Responsive sidebar toggle (for mobile)
function toggleSidebar() {
  const sidebar = document.querySelector('.ai-sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

// Auto-update dashboard metrics every 30 seconds
setInterval(() => {
  if (currentUser && document.getElementById('userDashboard').classList.contains('active')) {
    // Simulate real-time updates
    if (currentUser.profile && Math.random() > 0.7) {
      // Randomly update daily goal progress
      const progressEl = document.getElementById('dailyGoalProgress');
      const currentWidth = parseInt(progressEl.style.width) || 60;
      const newWidth = Math.min(100, currentWidth + Math.floor(Math.random() * 5));
      progressEl.style.width = newWidth + '%';
      
      const progressText = document.querySelector('.progress-text');
      if (progressText) {
        progressText.textContent = newWidth + '% Complete';
        
        if (newWidth >= 100) {
          showToast('Daily goal completed! 🎉', 'success');
        }
      }
    }
  }
}, 30000);

// Export functions for global access
window.showLogin = showLogin;
window.hideLogin = hideLogin;
window.showSignup = showSignup;
window.hideSignup = hideSignup;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleSocialLogin = handleSocialLogin;
window.logout = logout;
window.showAISection = showAISection;
window.startRecordSession = startRecordSession;
window.startExerciseAssessment = startExerciseAssessment;
window.hideExerciseModal = hideExerciseModal;
window.startExercise = startExercise;
window.stopExercise = stopExercise;
window.sendChatMessage = sendChatMessage;
window.viewExerciseDetails = viewExerciseDetails;
window.showAdminSection = showAdminSection;
window.hideToast = hideToast;
window.toggleSidebar = toggleSidebar;