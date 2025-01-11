/**
 * @version 0.0.1
 * Updated On : September 28, 2024
 * Auth Screen Left Side Carousal
 */
import { Carousel } from 'antd';
import { Fragment } from 'react';
import { authHeroImage } from 'src/assets';

export const  AuthCarousal = () => {
  return (
    <div className="flex-1 bg-primary text-center hidden lg:flex relative">
      <div
        className="w-full h-full bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${authHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-authGradientEnd to-authGradientStart/35 opacity-90"></div>
        <div className="absolute bottom-0 w-full p-6">
          <Carousel
            autoplay
            dots={{
              className: '!justify-start !mx-3',
           
            }}
          >
            <Fragment>
              <div className="flex mx-3 gap-3 mb-8">
                <span className="inline-block h-18 w-2 bg-primary rounded-sm" />
                <div>
                  <p className="text-white text-xl font-bold text-start">
                    Delivers immediate and long-term value
                  </p>
                  <p className="text-white text-lg">
                    Multiplier effect on training effectiveness across your L&D programs
                  </p>
                </div>
              </div>
            </Fragment>
            <Fragment>
              <div className="flex mx-3 gap-3 mb-8">
                <span className="inline-block h-18 w-2 bg-primary rounded-sm" />
                <div>
                  <p className="text-white text-xl font-bold text-start">
                    Delivers immediate and long-term value
                  </p>
                  <p className="text-white text-lg">
                    Multiplier effect on training effectiveness across your L&D programs
                  </p>
                </div>
              </div>
            </Fragment>
            <Fragment>
              <div className="flex mx-3 gap-3 mb-8">
                <span className="inline-block h-18 w-2 bg-primary rounded-sm" />
                <div>
                  <p className="text-white text-xl font-bold text-start">
                    Delivers immediate and long-term value
                  </p>
                  <p className="text-white text-lg">
                    Multiplier effect on training effectiveness across your L&D programs
                  </p>
                </div>
              </div>
            </Fragment>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
