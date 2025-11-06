import {COLORS} from '@/styles/variables';
import React, {useEffect, useState} from 'react';
import {styled, keyframes} from 'styled-components';
import {CustomBtn} from '../Shared/CustomBtn';
import {Btn1, Btn2, Btn2Style, Btn3} from '@/styles/textTags';
import QuestionsSvgSelector from './QuestionsSvgSelector';
import Image from 'next/image';
import frogImg from '@/assets/img/frog.png';
import {useRouter} from 'next/router';
import SvgSelector from '../Shared/SvgSelector';
import Loader from '../Shared/Loader';
import {addCompletedCourseSlug} from '@/features/localStorage';
import CrownSvgSelector from './CrownSvgSelector';

interface EndPageProps {
  // eslint-disable-next-line
  QuizFunc: any;
}

const EndPage = ({QuizFunc}: EndPageProps) => {
  const router = useRouter();
  const point_id = router.query.point_id;
  const section_slug = router.query.section_id;
  const course_slug = router.query.courses_id;

  const [achievement, setAchievement] = useState<boolean | null>(null);

  useEffect(() => {
    //check
    console.log('1. useEffect in end page')

    if (!point_id || !section_slug || !course_slug) return;

    //check
    console.log(
      '2. end page after check:',
      'point_id: ' + point_id,
      'section_slug: ' + section_slug,
      'course_slug: ' + course_slug,
    )

    const fetchData = async () => {
      //check
      console.log('3. fetchData')

      const data = await QuizFunc.gameOver(section_slug, Number(point_id));

      //check
      console.log('3. fun QuizFunc.gameOver() was end')

      if (data?.is_completed_course) {
        //check
        console.log('4.1. if data?.is_completed_course:' + data?.is_completed_course)
        setAchievement(true);
        addCompletedCourseSlug(String(course_slug));
      } else {
        //check
        console.log('4.2. if data?.is_completed_course:' + data?.is_completed_course)
        setAchievement(false);
      }
    };

    fetchData();

    //check
    console.log('5. end func fetchData()')
  }, [point_id, section_slug, course_slug]);

  if (achievement === null) {
    return <Loader/>;
  }

  return (
    <EndPageWr
    >
      <button onClick={() => router.push(`/courses/${course_slug}/${section_slug}`)}>
        <SvgSelector svg='close-btn'/>
      </button>
      <EndPageContentBlock
        data-aos="zoom-in-up"
        data-aos-duration='300'
      >
        <CrownBlock>
          <div>
            <Title
              data-aos="fade-down"
              data-aos-duration='300'
              data-aos-delay='300'
            >Поздравляем!</Title>
            <Level
              data-aos="fade-down"
              data-aos-duration='300'
              data-aos-delay='300'
            >уровень 1</Level>
          </div>

          <ImageCon>
            <CrownSvgSelector svg="base"
                              data-aos="zoom-in-up"
                              data-aos-duration='300'
            />
            <StarsCon>
              <div
                data-aos="zoom-in"
                data-aos-duration='300'
                data-aos-delay='300'
              >
                <CrownSvgSelector svg="left-star"/>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-duration='300'
                data-aos-delay='400'>
                <CrownSvgSelector svg="center-star"/>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-duration='300'
                data-aos-delay='500'>
                <CrownSvgSelector svg="right-star"/>
              </div>
            </StarsCon>
            <CrownSvgSelector svg="shining"/>
          </ImageCon>
        </CrownBlock>
        <ExpBlock>
          <Btn2
            data-aos="zoom-in"
            data-aos-duration='300'
            data-aos-delay='500'
          >Награда</Btn2>
          <PointRollBlock
            data-aos="zoom-in"
            data-aos-duration='300'
            data-aos-delay='500'>
            <QuestionsSvgSelector
              name={achievement ? 'stciker' : 'exp'}/>
            <span>{achievement ? '+1' : '+70'}</span>
          </PointRollBlock>
        </ExpBlock>
        <CustomBtn
          data-aos="fade-up"
          data-aos-duration='300'
          data-aos-delay='500'
          onClick={() => router.push(`/courses/${course_slug}/${section_slug}`)}>
          Продолжить
        </CustomBtn>
        {achievement && (
          <CustomBtn orange onClick={() => router.push('/achievements')}
                     data-aos="fade-up"
                     data-aos-duration='300'
                     data-aos-delay='600'
          >
            Мой{'\u00A0'}чемодан
          </CustomBtn>
        )}
      </EndPageContentBlock>
      {!achievement && <MascotImg
        src={frogImg.src} alt='Квакс' width={310} height={289}/>}
    </EndPageWr>
  );
};

const slideUpShining = keyframes`
  from {
    transform: translateX(-50%) translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
`;

const frogAppears = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const StarsCon = styled.div`
  position: absolute;
  width: 61.7vw;
  height: 29.42vw;
  top: -65%;
  left: 19%;
  z-index: 3;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  > div {
    &:first-of-type {
      width: 22vw;
      height: 22vw;
      margin-right: -5vw;
    }

    &:nth-of-type(2) {
      width: 29vw;
      height: 29vw;
    }

    &:last-of-type {
      width: 22vw;
      height: 22vw;
      margin-left: -5vw;
    }

    > svg {
      width: 100%;
      height: 100%;
    }
  }

`;

const EndPageWr = styled.div`
  //padding-top: 56vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40vw;
  overflow: hidden;

  > button {
    align-self: flex-end;
    justify-self: flex-start;
  }
`;

const ImageCon = styled.div`
  position: relative;
  width: 97.7vw;
  height: 30.8vw;

  > svg {
    position: absolute;

    &:first-of-type {
      width: 100%;
      height: 100%;
      z-index: 2;
      top: 0;
      left: 0;
    }

    &:last-of-type {
      width: 97.7vw;
      height: 50vw;
      transform: translateX(-50%);
      top: -100%;
      left: 50%;
      z-index: 1;
      animation: ${slideUpShining} 0.6s ease-out 0.3s backwards;
    }
  }
`;

const CrownBlock = styled.div`
  position: absolute;
  transform: translate(-50%, 0%);
  top: -10%;
  left: 50%;

`;

const Title = styled(Btn1)`
  color: ${COLORS.white};
  position: absolute;
  z-index: 4;
  font-size: 6.86vw;
  font-weight: 800;
  text-transform: uppercase;
  left: 21%;
  bottom: 7.5vw;
`;

const Level = styled(Btn3)`
  color: ${COLORS.white};
  position: absolute;
  z-index: 4;
  font-size: 4.57vw;
  font-weight: 500;
  left: 39%;
  bottom: 18vw;
`;

const EndPageContentBlock = styled.div`
  position: relative;
  z-index: 2;
  margin: 0 auto;
  width: 80vw;
  max-height: 100vw;
  //max-height: 139vw;
  //min-height: 74.29vw;
  background-color: ${COLORS.white};

  padding: 24.5vw 5.71vw 5.71vw;

  display: flex;
  flex-direction: column;
  justify-content: end;

  gap: 6vw;

  border-radius: 8.57vw;
  border: 3px solid ${COLORS.bubbleGreen};
`;

const ExpBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.71vw;
`;

const PointRollBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4vw;

  span {
    ${Btn2Style};
    font-size: 9.14vw;
    color: ${COLORS.textGreen};
  }

  svg {
    width: 12vw;
    height: 12vw;
  }
`;

const MascotImg = styled(Image)`
  animation: ${frogAppears} 0.6s ease-out forwards;
  position: absolute;
  bottom: -25vw;
  left: 50%;
  width: 85.57vw;
  height: 79.57vw;
  z-index: 0;
`;

export default EndPage;
