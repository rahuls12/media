import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import ExpandablePanel from "./expandablePanel";
import Button from "./Button";
import { ShimmerTable } from "react-shimmer-effects";

export default function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  let content;
  if (isLoading) {
    return <ShimmerTable row={5} col={1} />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album
        </ExpandablePanel>
      );
    });
  }

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  return (
    <div>
      <div>
        Albums for {user.name}
        <Button onClick={handleAddAlbum}>+Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}
