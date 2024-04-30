import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useEffect, useState } from "react";

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // }
  const [comments, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

 useEffect(() => {
    const asyncFunc = async () => {
      // this.setState({
      //   isLoading: true,
      // });
      setIsLoading(true);
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTcyYTdmMzA0NjAwMWFlNTlmNWYiLCJpYXQiOjE3MTQ0ODcyNjIsImV4cCI6MTcxNTY5Njg2Mn0.grx74og-PrSuKjxgDMwKcm6SpSe6nko5gUo04TpQdlE",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          // this.setState({
          //   comments: comments,
          //   isLoading: false,
          //   isError: false,
          // });
          setIsLoading(false);
          setIsError(false);
          setComment(comments);
        } else {
          // this.setState({ isLoading: false, isError: true });
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        // this.setState({ isLoading: false, isError: true });
        setIsLoading(false);
        setIsError(true);
      }
    };
    if(props.asin){
      asyncFunc();
    }
  },[props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
