import PhotoType from "../types/mediaTypes/PhotoType";
import LinkType from "../types/mediaTypes/LinkType";
import VideoType from "../types/mediaTypes/VideoType";
import DocType from "../types/mediaTypes/DocType";
import GifType from "../types/mediaTypes/GifType";
import MediaType from "../types/mediaTypes/MediaType";

import getPhoto from "./getPhoto";
import getLink from "./getLink";
import getVideo from "./getVideo";
import getDoc from "./getDoc";
import getGif from "./getGif";

async function parseAttachments(attachments: any[] = []): Promise<MediaType> {
  const photos: PhotoType[] = [];
  const links: LinkType[] = [];
  const videos: VideoType[] = [];
  const docs: DocType[] = [];
  const gifs: GifType[] = [];

  for (let attachment of attachments) {
    if (attachment.type === 'photo') {
      photos.push(await getPhoto(attachment.photo));
    } else if (attachment.type === 'video') {
      if (attachment.video['can_add']) {
        videos.push(await getVideo(attachment.video));
      }
    } else if (attachment.type === 'doc') {
      if (attachment.doc.ext === 'gif') {
        gifs.push(await getGif(attachment.doc));
      } else {
        docs.push(await getDoc(attachment.doc));
      }
    } else if (attachment.type === 'link') {
      links.push(await getLink(attachment.link));
    }
  }

  return { photos, videos, docs, links, gifs };
}

export default parseAttachments;