import Image from 'next/image'
import { useState } from 'react'

export async function getStaticProps() {
  const token_uri = 'https://ig.instant-tokens.com/users/e133c3be-ebc7-4f8f-a9e5-4e7553dfa034/instagram/17841450788521522/token?userSecret=' + process.env.USER_SECRET
  const ig_data_uri = 'https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token='

  const token = await fetch(token_uri).then(res => res.json())
  // console.log(token)
  const ig_data = await fetch(ig_data_uri + token.Token)
    .then(res => res.json())
    .then(res => res.data)
  
  // console.log(ig_data)

  return {
    props: {
      images: ig_data
    }
  }
}

function hpf(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Image = {
  id: number
  caption: string
  media_url: string
  permalink: string
  timestamp: string
}

export default function Gallery({ images }: { images: Image[] }) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((images) => (
          <BlurImage key={images.id} image={images} />
        ))}
      </div>
    </div>
  )
}

function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true)
  const date = new Date(image.timestamp)
  const title = image.caption.split('\n')[0]
  const encoded_url = encodeURIComponent(image.media_url)
  const image_url = 'https://res.cloudinary.com/demo/image/fetch/' + encoded_url

  return (
    <a href={image.permalink} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={image_url}
          layout="fill"
          objectFit="cover"
          className={hpf(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{date.toLocaleDateString()}</p>
    </a>
  )
}
