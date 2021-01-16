import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ShopIcon from '@material-ui/icons/Shop';
import useStyles from '../../style/theme';

const ProductCard = ({
  productName,
  imageUrl,
  storeName,
  productPrice,
  productId,
  deleteProduct,
  storeUrl,
  buyProduct,
  isCouple,
  coupleId,
  onHold,
  purchased,
}) => {
  const handleClick = () => {
    if (isCouple) {
      deleteProduct(productId);
    } else {
      buyProduct(productId, coupleId);
    }
  };

  const classes = useStyles();

  return (
    <div
      className={classes.cardShadow}
      style={{ width: '45%', margin: '13px', float: 'left' }}
    >
      <div style={{ width: '100%', background: 'red', position: 'relative' }}>
        <section style={{ height: '300px', width: '50%', float: 'left' }}>
          <CardActionArea
            style={{ height: 300, borderRadius: '15px 0px 0px 15px' }}
          >
            <CardMedia
              className={classes.productCardMedia}
              image={imageUrl}
              title={productName}
              style={{ borderRadius: '15px 0px 0px 15px' }}
            />
          </CardActionArea>
        </section>

        <section
          style={{
            height: '300px',
            width: '50%',
            float: 'right',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '0',
              textAlign: 'left',
              left: '20px',
              top: '20px',
              height: '35%',
              color: '#0a1511',
            }}
          >
            <Typography style = {{fontSize: '16px'}}>{productName} </Typography>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              left: '0px',
              height: '35%',
              width: '100%',
            }}
          >
            <Typography
              className={classes.productPrice}
              variant="h4"
              color="textSecondary"
            >
              ${productPrice}
            </Typography>
            <div></div>
            <div>
              <CardActions>
                <Button
                  onClick={handleClick}
                  variant="contained"
                  color={isCouple === undefined ? 'primary' : 'secondary'}
                  size="small"
                  startIcon={
                    isCouple === undefined ? <ShopIcon /> : <DeleteIcon />
                  }
                  style={{ flexGrow: 1 }}
                  disabled={onHold ? true : false}
                >
                  {onHold ? 'On Hold' : isCouple ? 'Delete' : 'Buy'}
                </Button>
              </CardActions>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
