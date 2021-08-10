
export const createStory = (obj) => {
    let story = ``
    story += `# ${obj.title} \r`
    for (let i =0; i < obj.featureList.length; i++) {
        let {questions, answers, users, userA, actions, results} = obj[obj.featureList[i]]
        story += `## ${obj[obj.featureList[i]].feature.toUpperCase()} \r`
        story += `### Questions: \r`
        for(let k = 0; k < questions.length; k++ ){
            story +=` * ${questions[k]} \r \n`
            story +=`\t * ${answers[k]} \r \n`
        }
        story += `### Acceptance Criteria: \r`
        story += `* If I am a ${userA}: \r`
        for(let j = 0; j < users.length; j++){
            story += `\t* As a ${users[j]} I want to be able to ${actions[j]} so that I can ${results[j]} \r`
        }

    }
return story
}


