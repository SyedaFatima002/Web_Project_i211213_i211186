import useWishItems from "../Hooks/useWishItems";
import '../CSS/Wishlist.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { deleteWishItem } from "../ApiCalls/deleteWishItem";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUser from "../Hooks/useUser";


function WishItem(){
    const {error, isError, isLoading, data}=useWishItems();
    console.log(data)

    const {token}=useUser();
    const queryClient=useQueryClient();

    const removalMutation=useMutation({
        mutationFn: (item)=> deleteWishItem(item.token, item.wishId)
    })

    const handleRemoval=(e, itemid)=>{
        e.preventDefault();
        removalMutation.mutate({
            token:token,
            wishId:itemid
        },
        {
            onSuccess: (data) => {
                console.log(data);
                queryClient.invalidateQueries('getwishitems');
            },
        })
    }


    return(
        <>
        { isError && <div>Sorry we cant do shit. Gonna change this late {error} </div>}
        { isLoading && <div>Loading Wish List</div>}
        {data && data.map((item)=>{
            return(
                <Container key={item._id} className="borderTop">
                    <Row className="rowSpace">
                        <Col xs={5}>
                            <img
                                alt="prodImage"
                                src={item.image}
                                width="70px"
                                height="70px"
                            /><span> {item.name}</span>                          
                        </Col>
                        <Col>{item.price}</Col>
                        <Col>{item.soldout?"Out of Stock":"In Stock"}</Col>
                        <Col>
                            <Button variant="outline-success" size="sm">Add to Cart</Button>{' '}
                            <Button variant="outline-danger" size="sm" onClick={(e)=>handleRemoval(e, item._id)}>Remove</Button>
                        </Col>
                    </Row>
                </Container>
            )
        })}
        </>
    );
}

export default WishItem;