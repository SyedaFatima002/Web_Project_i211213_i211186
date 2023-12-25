import useWishItems from "../Hooks/useWishItems";
import '../CSS/Wishlist.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { deleteWishItem } from "../ApiCalls/deleteWishItem";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUser from "../Hooks/useUser";
import usePage from "../Hooks/usePage";
import useItemId from "../Hooks/useItemId";


function WishItem(){
    const {error, isError, isLoading, data}=useWishItems();
    const setPage = usePage((state) => state.setPage);
    const setItemId=useItemId((state)=> state.setItemId);

    const {token}=useUser();
    const queryClient=useQueryClient();

    const removalMutation=useMutation({
        mutationFn: async(item)=> {
            try{
                const result= await deleteWishItem(item.token, item.wishId)
                return result
            }catch(err){
                console.error('Error deleting wish item:', error);
                throw error;
            }
        }
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

    const handleItemClick=(itemid)=>{
        console.log(itemid)
        setItemId(itemid);
        setPage("ItemDisplay")
    }

    return(
        <>
        { isError && <div>Sorry we cant do shit. Gonna change this late {error.message} </div>}
        { isLoading && <div>Loading Wish List</div>}
        {data && data.length>0 ? (data.map((item)=>{
            return(
                <Container key={item._id} className="borderTop">
                    <Row className="rowSpace">
                        <Col xs={5}>
                            <img
                                alt="prodImage"
                                src={item.image}
                                width="70px"
                                height="70px"
                            />
                            <span className="link"
                                onClick={()=> handleItemClick(item._id)}
                            > 
                                {item.name}
                            </span>                    
                        </Col>
                        <Col>$ {item.price}</Col>
                        <Col>{item.soldout?"Out of Stock":"In Stock"}</Col>
                        <Col>
                            <Button variant="outline-warning" size="sm">Add to Cart</Button>{' '}
                            <Button variant="outline-danger" size="sm" onClick={(e)=>handleRemoval(e, item._id)}>Remove</Button>
                        </Col>
                    </Row>
                </Container>
            )
        })):<div>No items in the wishlist</div>}
        </>
    );
}

export default WishItem;