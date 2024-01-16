const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function addCourses() {
  try {
    await database.course.createMany({
      data: [
        { name: "Personal Development, Citizenship and Civics" },
        { name: "Communication" },
        { name: "Art" },
        { name: "English" },
        { name: "Technology and Projects" },
        { name: "Religious Education" },
        { name: "Physical Education" },
        { name: "Math" },
        { name: "Science and Environment" },
        { name: "philosophy" },
        { name: "Accounting" },
        { name: "Geographic and Economic History" },
        { name: "Citizenship and Civic Education" },
        { name: "Physical Education and Health" },
        { name: "Economy" },
        { name: "Consumer Rights" },
        { name: "Education for Work Financial and Tax Education" }
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database courses", error);
  } finally {
    await database.$disconnect();
  }
}

async function addAcademyLevels() {
    try {
      await database.academy.createMany({
        data: [
            { name: "Initial Education" },
            { name: "Primary Education" },
            { name: "Secondary Education" },
        ]
      })
        
    console.log("Success");
    } catch (error) {
        
        console.log("Error seeding the database academy Levels", error);
    } finally {
      await database.$disconnect();
    }
}

async function addEducationLevels() {
    try {
      await database.educationLevel.createMany({
        data: [
            { name: "Initial (3,4,5 years)" },
            { name: "Primary(1st - 6th grades)" },
            { name: "Secondary (1st - 5th grades)" },
        ]
      })
        
    console.log("Success");
    } catch (error) {
        
        console.log("Error seeding the database education Levels", error);
    } finally {
      await database.$disconnect();
    }
}

async function addAverageAges() {
    try {
      await database.averageAge.createMany({
        data: [
            { name: "3" },
            { name: "4" },
            { name: "5" },
            { name: "6" },
            { name: "7" },
            { name: "8" },
            { name: "9" },
            { name: "10" },
            { name: "11" },
            { name: "12" },
            { name: "13" },
            { name: "14" },
            { name: "15" },
            { name: "16" },
            { name: "17" },
            { name: "18" },
        ]
      })
        
    console.log("Success");
    } catch (error) {
        
        console.log("Error seeding the database average age", error);
    } finally {
      await database.$disconnect();
    }
}

// async function createRegBasis(){
//   try {
//     await database.

//   } catch(error){

//   } finally{

//   }
// }


async function addDepatments() {
  try {
    await database.department.createMany({
      data : [
        {"name": "Amazon"},
         {"name": "Ancash"},
        {"name": "Apurimac"},
         {"name": "Arequipa"},
        {"name": "Ayacucho"},
         {"name": "Cajamarca"},
       {"name": "Callao"},
        {"name": "Cusco"},
        {"name": "Huancavelica"},
         {"name": "Huanuco"},
        {"name": "Ica"},
        {"name": "Junin"},
        {"name": "Freedom"},
        {"name": "Lambayeque"},
        {"name": "Lime"},
         {"name": "Loreto"},
         {"name": "Mother of God"},
         {"name": "Moquegua"},
        {"name": "Pasco"},
        {"name": "Piura"},
        {"name": "Fist"},
        {"name": "San Martin"},
        {"name": "Tacna"},
        {"name": "Tumbes"},
        {"name": "Ucayali"}
      ]
    })
    
  } catch (error) {
    console.log("An Error occured while adding departments")
  } finally{
    database.$disconnect()
  }
}

// addEducationLevels()
// addAverageAges()
// addAcademyLevels();
// addCourses();
addDepatments()


