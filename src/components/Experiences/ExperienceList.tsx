import { IExpList } from '../../types';
import { getExperienceList } from '../../api';
import Experience from './Experience';
import ExperienceSkeleton from './ExperienceSkeleton';
import List from '../List';

export default function ExperienceList() {
  return (
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
          price={experience.price}
          totalReviews={experience.total_reviews}
          ratingAverage={experience.rating_average}
          thumbnail={experience.thumbnail.file}
          videoUrl={experience.video.file}
        />
      )}
    ></List>
  );
}
