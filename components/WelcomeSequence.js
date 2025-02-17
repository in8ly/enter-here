  {/* Transformation sequence */}
  <div 
  className={`
    mt-8 space-y-4 text-left
    transition-all duration-1000 delay-500 ease-in-out transform
    ${hasScrolled ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-8'}
  `}
>
  <div className="text-[#88b4e6]">
    initiate_transformation {`{`}
  </div>
  <div className="pl-8 text-[#a3d4e5]">
    state: "liminal_space";<br/>
    context: "between_worlds";<br/>
    intention: "healing_connection";
  </div>
  <div className="text-[#88b4e6]">
    {`}`}
  </div>
  <div className="text-center mt-8 text-[#e6d7e6] italic opacity-60">
    /* navigating the space between what was and what will be */
  </div>
</div>
</div>
</div>
);
};

export default WelcomeSequence;