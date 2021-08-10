import Editor from "rich-markdown-editor";
import { useStory } from "../context/StoryContext";

const Preview = () => {
    const { mdStory } = useStory()

    return(

        <div>
            <Editor value={mdStory} />
        </div>
    )

}

export default Preview