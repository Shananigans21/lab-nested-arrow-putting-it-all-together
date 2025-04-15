function createLoginTracker(userInfo) {
  let attemptCount = 0;
  const maxAttempts = 3;

  // Inner arrow function to handle login attempts
  const login = (username, password) => {
    // Check if account is already locked
    if (attemptCount >= maxAttempts) {
      return "Account locked due to too many failed login attempts.";
    }

    // Check if username and password are correct
    if (username === userInfo.username && password === userInfo.password) {
      return "Login successful!";
    } else {
      attemptCount++; // Increment on failed attempt

      // Lock account if max attempts reached
      if (attemptCount >= maxAttempts) {
        return "Account locked due to too many failed login attempts.";
      }

      // Return failed attempt message
      return `Login failed. Attempt ${attemptCount} of ${maxAttempts}.`;
    }
  };

  // Return the inner login function
  return login;
}

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};

if (require.main === module) {
  const tracker = createLoginTracker({ username: "user1", password: "password1" });

  console.log(tracker("user1", "wrong"));     // Attempt 1
  console.log(tracker("user1", "wrong"));     // Attempt 2
  console.log(tracker("user1", "wrong"));     // Attempt 3
  console.log(tracker("user1", "password1")); // Should say account is locked
}
