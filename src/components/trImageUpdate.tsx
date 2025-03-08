

interface TrImageUpdateProps {
    setImage: (event:any, id:any) => void;
    id: number;
}

export default function TrImageUpdate(props: TrImageUpdateProps) {

    return (
       <div>
         <span
                    className="badge bg-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      document
                        .getElementById("fileImg-" + props.id)
                        ?.click();
                    }}
                  >
                    Update Image
                  </span>
                  <input
                    type="file"
                    hidden
                    id={"fileImg-" + props.id}
                    name={"fileImg-" + props.id}
                    onChange={() => props.setImage(event, props.id)}
                  />
       </div>
    );
}