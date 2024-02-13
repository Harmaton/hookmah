const addTeachers = async (emails: string | string[]) => {
    // If emails is a single string, wrap it in an array
    const emailList = Array.isArray(emails) ? emails : [emails];
  
      try {
        const response = await fetch('/api/users/teachers/add-teachers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailList }),
        });
        const data = await response.json();
        return data; // This will return the updated user objects or a message
      } catch (error) {
        console.error('Error adding teachers:', error);
        return { error: 'Failed to add teachers' };
      }
    };
    
    export default addTeachers;
    