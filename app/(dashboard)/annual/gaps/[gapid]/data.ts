import { z } from "zod";

export const sectionIIOptions = [
    {
        name: "workHours",
        values: [
            { id: "flexible", label: "Flexible" },
            { id: "fixed", label: "Fixed" },
            { id: "remote", label: "Remote" },
            { id: "office", label: "Office" },
        ],
    },
    {
        name: "rituals",
        values: [
            { id: "meditation", label: "Meditation" },
            { id: "exercise", label: "Exercise" },
            { id: "reading", label: "Reading" },
            { id: "gratitude", label: "Gratitude" },
        ],
    },
    {
        name: "habits",
        values: [
            {
                id: "time management",
                label: "Time management",
            },
            {
                id: "mindfulness",
                label: "Mindfulness",
            },
            {
                id: "healthy eating",
                label: "Healthy eating",
            },
            {
                id: "journaling",
                label: "Journaling",
            },
        ],
    },
    {
        name: "motivationSources",
        values: [
            { id: "nature", label: "Nature" },
            {
                id: "books",
                label: "Books",
            },
            {
                id: "music",
                label: "Music",
            },
            {
                id: "travel",
                label: "Travel",
            },
        ],
    },
    {
        name: "visionOfSuccess",
        values: [
            {
                id: "impact",
                label: "Impact",
            },
            {
                id: "happiness",
                label: "Happiness",
            },
            {
                id: "fulfillment",
                label: "Fulfillment",
            },
            {
                id: "achievement",
                label: "Achievement",
            },
        ],
    },
    {
        name: "keyMilestones",
        values: [
            { id: "career progression", label: "Career progression" },
            { id: "further education", label: "Further education" },
            { id: "personal projects", label: "Personal projects" },
            { id: "milestone events", label: "Milestone events" },
        ],
    },
    {
        name: "currentChallenges",
        values: [
            { id: "time management", label: "Time management" },
            { id: "work-life balance", label: "Work-life balance" },
            { id: "skill improvement", label: "Skill improvement" },
            { id: "decision making", label: "Decision making" },
        ],
    },
    {
        name: "overcomingStrategies",
        values: [
            { id: "seeking help", label: "Seeking help" },
            { id: "prioritization", label: "Prioritization" },
            { id: "mindfulness", label: "Mindfulness" },
            { id: "adaptability", label: "Adaptability" },
        ],
    },
    {
        name: "improvementAreas",
        values: [
            { id: "communication skills", label: "Communication skills" },
            { id: "time management", label: "Time management" },
            { id: "leadership abilities", label: "Leadership abilities" },
            { id: "emotional intelligence", label: "Emotional intelligence" },
            { id: "critical thinking", label: "Critical thinking" },
            { id: "problem-solving skills", label: "Problem-solving skills" },
            { id: "creativity and innovation", label: "Creativity and innovation" },
            { id: "stress management", label: "Stress management" },
            { id: "adaptability", label: "Adaptability" },
            { id: "decision-making skills", label: "Decision-making skills" },
            { id: "teamwork skills", label: "Teamwork skills" },
        ],
    },
    {
        name: "coreValues",
        values: [
            { id: "love", label: "Love" },
            { id: "joy", label: "Joy" },
            { id: "peace", label: "Peace" },
            { id: "patience", label: "Patience" },
            { id: "kindness", label: "Kindness" },
            { id: "goodness", label: "Goodness" },
            { id: "faithfulness", label: "Faithfulness" },
            { id: "gentleness", label: "Gentleness" },
            { id: "self-control", label: "Self-control" },
        ],
    },
    {
        name: "beliefs",
        values: [
            { id: "hard work pays off.", label: "Hard work pays off." },
            {
                id: "everything happens for a reason.",
                label: "Everything happens for a reason.",
            },
            {
                id: "treat others as you want to be treated.",
                label: "Treat others as you want to be treated.",
            },
            {
                id: "honesty is the best policy.",
                label: "Honesty is the best policy.",
            },
            {
                id: "learning from failure leads to success.",
                label: "Learning from failure leads to success.",
            },
            {
                id: "change is the only constant.",
                label: "Change is the only constant.",
            },
            {
                id: "success comes from perseverance.",
                label: "Success comes from perseverance.",
            },
            {
                id: "the power of positive thinking.",
                label: "The power of positive thinking.",
            },
            {
                id: "kindness is always worthwhile.",
                label: "Kindness is always worthwhile.",
            },
            {
                id: "respect for others and their opinions.",
                label: "Respect for others and their opinions.",
            },
        ],
    },
] as const;


export const strategyFormDataSchema = z.object({
    title: z.string({
        required_error: "You need a title",
    }),
    year: z.string({

        required_error: "This is yrar is needed",
    }),
    institutionName: z.string({
        required_error: "You have to provide your institution Name.",
    }),
    proffesorName: z.string({
        required_error: "You have to provide your proffesor Name.",
    }),
    city: z.string({
        required_error: "Must provide your City.",
    }),
    district:z.string({
        required_error: "Must provide your City.",
    }),
    rituals: z.string({
        required_error: "Must provide your City.",
    }),
    habits:z.string({
        required_error: "Must provide your City.",
    }),
    motivationSources:z.string({
        required_error: "Must provide your City.",
    }),
    visionOfSuccess: z.string({
        required_error: "Must provide your City.",
    }),
    keyMilestones: z.string({
        required_error: "Must provide your City.",
    }),
    improvementAreas: z
        .enum([
            "Communication skills",
            "Time management",
            "Leadership abilities",
            "Emotional intelligence",
            "Critical thinking",
            "Problem-solving skills",
            "Creativity and innovation",
            "Stress management",
            "Adaptability",
            "Decision-making skills",
            "Teamwork skills",
        ])
        .array()
        .max(3, { message: "Please select at least one option and a maximum of three." })
        .refine((value) => value.some((some) => some), {
            message: "Please select at least one option and a maximum of three.",
        }),
});


export const strategySteps = [
    {
        id: "Step 1",
        name: "General Information",
        fields: [
            "title",
            "year",
            "institutionName",
            "proffesorName",
            "institutionName",
            "city",
            "district"
        ],
    },
    {
        id: "Step 2",
        name: "Finer Details",
        fields: [
            "rituals",
            "habits",
            "motivationSources",
            "visionOfSuccess",
            "keyMilestones",
            "currentChallenges",
            "overcomingStrategies",
        ],
    },
    {
        id: "Step 3",
        name: "AI Assistant",
        fields: [
            "currentSkills",
            "improvementAreas",
            "newSkills",
            "coreValues",
            "beliefs",
        ],
    },
    {
        id: "Step 4",
        name: "Sign and Download",
        fields: [
            "signature",
        ],
    },

];