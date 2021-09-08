
export const createStory = (obj) => {
    let story = ``
    const {featureList, title} = obj
    story += `# ${title} \r`

    for (let i =0; i < featureList.length; i++) {
        let {questions, answers, users, actions, results, acceptanceCriteria} = obj[featureList[i]]
        story += `## ${obj[obj.featureList[i]].feature.toUpperCase()} \r`
        story += `### Questions: \r`
        for(let k = 0; k < questions.length; k++ ){
            story +=` * ${questions[k]} \r \n`
            story +=`\t * ${answers[k]} \r \n`
        }
        story += `### Stories and Acceptance criteria: \r`
        for(let j = 0; j < users.length; j++){
            story += `**User Story**`
            story += `\t* As a ${users[j]} I want to be able to ${actions[j]} so that I can ${results[j]} \r`
            story+=`**Acceptance Criteria`
            for(let h=0; h < acceptanceCriteria[j].length; h++){
                story += `-[] ${acceptanceCriteria[j]} \r`
            }
        }
    }
return story
}


