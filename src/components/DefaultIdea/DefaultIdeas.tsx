import DefaultIdea from "./DefaultIdea";

const defaultIdeas = [
  {
    idea: "Design database schema",
    moreContext: "Design a database schema for a social media app",
  },
  {
    idea: "Give me code snippet",
    moreContext:
      "Give me a code snippet to create a database schema for a social media app",
  },
  { idea: "Tell me a joke", moreContext: "Tell me a joke" },
  {
    idea: "Design redux store",
    moreContext: " Design a redux store for a social media app",
  },
];

export default function DefaultIdeas({ visible = true }) {
  return (
    <div className={`row1 ${visible ? "block" : "hidden"}`}>
      <DefaultIdea ideas={defaultIdeas.slice(0, 2)} />
      <DefaultIdea
        ideas={defaultIdeas.slice(2, 4)}
        myclassNames="hidden md:visible"
      />
    </div>
  );
}
