import React from "react";
import RenderTrending from "../Render/RenderTrending";

const Trending = () => {
    return (
        <div className="w-full px-6 py-6">
            <h2 className="text-white text-3xl font-bold mb-6">Trending Now</h2>

            {/* Masonry Columns */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                <RenderTrending></RenderTrending>
                {/* <Render></Render> */}
            </div>
        </div>
    );
};

export default Trending;
