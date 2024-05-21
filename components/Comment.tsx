const CommentComponent = () => {
  return (
    <div className="flex mb-2">
      <div>
        <div className="w-[40px] h-[40px] overflow-hidden bg-[#3b4045] rounded-full mr-4"></div>
      </div>
      <div className="flex flex-col text-xs">
        <span className="flex">
          <span>Artist</span>
          <span className="mx-1">·</span>
          <span>3 hours ago</span>
        </span>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nisi
          facilis maxime aperiam veritatis in excepturi sequi aut omnis quod
          quae, repellendus recusandae maiores iusto quibusdam quas perspiciatis
          earum laborum.
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
