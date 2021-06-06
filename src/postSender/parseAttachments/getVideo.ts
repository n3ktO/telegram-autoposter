import VideoType from '../types/mediaTypes/VideoType';
import vk from '../../vk';

async function getVideo(video: any): Promise<VideoType> {
  const { 'owner_id': ownerId, id, 'access_key': accessKey, title } = video;

  let link;
  try {
    const videoData = (await vk.video.get({
      'videos': `${ownerId}_${id}_${accessKey}}`
    })).items[0];

    if (videoData.platform === 'YouTube') {
      const regexp = /https\:\/\/www\.youtube\.com\/embed\/(.+)\?__ref=vk\.api/;
      const [, youtubeId] = videoData.player.match(regexp);
      link = `https://www.youtube.com/watch?v=${youtubeId}`;
    } else {
      link = `https://vk.com/video${ownerId}_${id}`;
    }
  } catch (e) {
    link = `https://vk.com/video${ownerId}_${id}`;
  }

  return { title: title, url: link };
}

export default getVideo;