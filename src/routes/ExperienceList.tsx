import { IExpList } from '../types';
import { getExperienceList } from '../api';
import List from '../components/Shared/List';
import ExperienceSkeleton from '../components/Experiences/ExperienceSkeleton';
import Experience from '../components/Experiences/Experience';
import { Helmet } from 'react-helmet';

export default function ExperienceList() {
  return (
    <>
      <Helmet>
        <title>Experiences</title>
      </Helmet>
      <List<IExpList>
        queryKey={['expListInfo']}
        queryFn={getExperienceList}
        renderSkeleton={() => <ExperienceSkeleton />}
        renderItem={(experience: IExpList) => (
          <Experience
            pk={experience.pk}
            name={experience.name}
            country={experience.country}
            city={experience.city}
            duration={experience.duration}
            price={experience.price}
            totalReviews={experience.total_reviews}
            ratingAverage={experience.rating_average}
            thumbnail={experience.thumbnail.file}
            videoUrl={experience.video.file}
          />
        )}
      ></List>
    </>
  );
}
