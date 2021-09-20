import { useSelector } from "react-redux";
import Editor from "rich-markdown-editor";
import { useStory } from "../context/StoryContext";

const Preview = () => {
    const story = useSelector(state => state.stories.current)

    return(

        <div>
            <Editor value={story.story} readOnly={true} />
        </div>
    )

}

export default Preview