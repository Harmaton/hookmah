const getAllTeachers = async () => {
  try {
    const response = await fetch('/api/all-teachers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const teachers = await response.json();
    return teachers; // This should be an array of teacher objects
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return []; // Return an empty array as a fallback
  }
};

export default getAllTeachers;
