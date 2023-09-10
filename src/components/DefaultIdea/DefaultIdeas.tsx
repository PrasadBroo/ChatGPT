import DefaultIdea from "./DefaultIdea";

export default function DefaultIdeas({visible = true}) {
  return (
    <div className={`row1 md:flex md:items-center md:gap-2 ${visible ? 'block' : 'hidden'}`} >
      {[...Array(2)].map((_, i) => (
        <DefaultIdea key={i} />
      ))}
    </div>
  );
}
