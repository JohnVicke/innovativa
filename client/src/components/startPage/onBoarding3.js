import React from "react";

import OnBoarding from "../onBoarding/onBoarding";
import quiz from "../../assets/quiz.png";

const onBoarding3 = () => {
  return (
    <div>
      <div className="outer">
        <img className="quizPic" src={quiz} alt="quiz"></img>
        <div className="text">
          <OnBoarding
            header="Quiz"
            bread="Ta vårat specialskräddade quiz, den hjälper 
      oss göra kvalificerade rekommendationer för just dig. Om du är ärlig så blir 
      datat mer trovärdigt och hjälper i sin tur fler! Don’t be a buzzkill just do the quiz!"
            curr={3}
          />
        </div>
      </div>
    </div>
  );
};

export default onBoarding3;
