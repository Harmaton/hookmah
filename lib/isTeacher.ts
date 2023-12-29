const checkIsTeacher = async (email: string) => {
    try {
      const response = await fetch('/api/check-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.isTeacher;
    } catch (error) {
      console.error('Error checking if user is a teacher:', error);
      return false;
    }
  };
  
  export default  checkIsTeacher