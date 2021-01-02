import React, { Component, memo } from "react";
import Axios from "axios";
import { Socket } from "./NavAdmin/NavAdmin";
import "./Admin_Product.css";
import { firebase } from '../../firebase/firebase'
import 'firebase/storage'


export default class Admin_Product extends Component {
  state = {
    themThuongHieu: false,
    isthemming: true,
    hangs: [],
    //
    sanphams: [],
  };

  componentDidMount() {
    Socket.emit("getAllBrand");
    Socket.on("getAllBrand_res", (data) => {
      this.setState({ hangs: data });
    });
  }

  componentWillUnmount() {
    Socket.off("getAllBrand_res");
  }

  

  //////////////////////////////////////////// Thêm hãng
  Themming = () => {
    this.setState({ isthemming: !this.state.isthemming });
  };
  StopThemming = () => {
    this.setState({ isthemming: !this.state.isthemming });
  };

  ThemSanPham = (data) => {
    Socket.emit("ThemBrand", { thuonghieu: data });
  };

  //////////////////////////////////////////// Thêm hãng

  render() {
    let UI;
    this.state.themThuongHieu
      ? (UI = (
          <ThemThuongHieu
            state={this.state.isthemming}
            Hangs={this.state.hangs}
            Themming={this.Themming}
            StopThemming={this.StopThemming}
            ThemTH={this.ThemSanPham}
          />
        ))
      : (UI = (
          <ThemSanPham 
            Hangs={this.state.hangs}
            Themming={this.Themming}
            StopThemming={this.StopThemming}
            state={this.state.isthemming}
          />
        ));

    return (
      <>
        <hr />
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <button
            style={{ width: "50%" }}
            className="btn btn-success"
            onClick={(e) => {
              this.setState({ themThuongHieu: false });
            }}
          >
            Thêm Sản phẩm
          </button>
          <button
            style={{ width: "50%" }}
            className="btn btn-primary"
            onClick={(e) => {
              this.setState({ themThuongHieu: true });
            }}
          >
            + Thương hiệu
          </button>
        </div>
        {UI}
      </>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function ThemThuongHieu({ ThemTH, StopThemming, Hangs, state, Themming }) {
  function themThuongHieu() {
    let tenthuonghieu = document.getElementById("tenthuonghieu").value;
    console.log(tenthuonghieu);
    ThemTH(tenthuonghieu);
    StopThemming();
  }

  return (
    <>
      <hr />
      <h3 className="text-center"> Thêm thương hiệu </h3>
      <hr />
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm">
          <thead>
            <tr>
              <th style={{ width: "10%" }} scope="col">
                Stt
              </th>
              <th style={{ width: "20%" }} scope="col">
                Id
              </th>
              <th style={{ width: "50%" }} scope="col">
                Tên thương hiệu{" "}
              </th>
              <th style={{ width: "20%" }} scope="col">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {Hangs.map((val, i) => {
              return (
                <tr key={i + 1}>
                  <th> {i + 1} </th>
                  <th> {val.id} </th>
                  <th> {val.brand.Brand} </th>
                  <th>
                    <button
                      className="btn btn-outline-secondary"
                      style={{ width: "30%" }}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      style={{ width: "20%" }}
                    >
                      X
                    </button>
                  </th>
                </tr>
              );
            })}

            {state ? (
              <tr>
                <th> {Hangs.length + 1} </th>
                <th> ... </th>
                <th>
                  <input
                    className="form-control"
                    id="tenthuonghieu"
                    style={{ width: "100%" }}
                  />
                </th>
                <th>
                  <button
                    className="btn btn-success"
                    onClick={(e) => {
                      themThuongHieu();
                    }}
                    style={{ width: "100%" }}
                  >
                    thêm
                  </button>
                </th>
              </tr>
            ) : null}

            <tr>
              <th colSpan={4}>
                {state ? (
                  <button
                    onClick={(e) => {
                      StopThemming();
                    }}
                    style={{ width: "50%" }}
                    className="btn btn-outline-danger"
                  >
                    Huỷ
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      Themming();
                    }}
                    style={{ width: "50%" }}
                    className="btn btn-outline-success"
                  >
                    {" "}
                    Thêm Loại{" "}
                  </button>
                )}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}



///////////////////////////////////////////////////////////////////////////////////////////////////



let formfield = [
  { fieldName: "Tên sản phẩm",state :'ten' },
  { fieldName: "Hãng",state:'hang' },
  ];



///////////////////////////////////////////////////////////////////////////////////////////////////




function ThemSanPham(props) {
  //console.log(props);

  class FormAddSP extends Component 
  {
    
    state = {
      hinh : '',
      ten : '',
      hang : '',
      focus : false,
      hangs : [...props.Hangs]
    }

    componentDidMount() { 
      console.log(this.state)
      let a = new Admin_Product()
      a.render()
    }

    //////////////////////////////////////////// Thêm Sản phẩm
    SendFile = () => {
      return new Promise(
        async (resolve,reject) => {
          let myFile = document.querySelector("input[type=file]").files[0];
          
          // let data = new FormData();
          // data.append("hinh", myFile);

          // let res = await Axios.post("https://stest1152.herokuapp.com/upload", data);
          // // http://localhost:3001/upload
          // //console.log(res.data)
          // let { status, fileNameInServer } = res.data;
          // //console.log(fileNameInServer)
          // let filename = String(fileNameInServer).split("\\");
          // //console.log(filename)
          // let imageAdress = `https://stest1152.herokuapp.com/images/${filename[1]}`;
          let date = Date.now()

          firebase.storage().ref()
          .child(`${date}`)
          .put(myFile)
          .then(async e => {
            resolve({
              stt : true , 
              imageAdress: await e.ref.getDownloadURL(),
              refByName : date
            });
          })
          .catch(err=>{
            reject({stt : false ,})
          })

          
        }
      );
    };

    UploadProduct = async (e) => 
    {
      //e.preventDefault()

      let { stt , imageAdress } = await this.SendFile();

      console.log(imageAdress + ' ' + stt);
      // if (stt ) 
      // {
      //   console.log(await firebase.storage()
      //   .ref('53470922_538098283368181_2120018564797693952_n.jpg')
      //   .getDownloadURL())

      // }
      // (status &&
      //   String(this.state.ten).length!==0 &&
      //   String(this.state.hang).length!==0) 
      //   &&Socket.emit("upDataProDuctToFirebase", {
      //       imageAdress: imageAdress ,
      //       tensanpham : this.state.ten,
      //       thuonghieu : this.state.hang
      //     });
      


      document.getElementById(formfield.length).value = "";
      this.setState({hang:'',ten:'',hinh:''})
    }

    ConvertImageTo64Url = e => 
    {
      try {
        var fr = new FileReader()
        fr.onloadend = e => {
          this.setState({ hinh : e.target.result})
        }
        fr.readAsDataURL(e)
      } 
      catch (error) {
        this.setState({ hinh : ''})
      }
    }

    setS = (statefield , value) => 
    {
      this.setState( {[statefield] :value} )
    }



    OnClickOnlistEle = (index) => {
      //console.log(index)
      //console.log(array.item(index).textContent)
      let array = document.querySelectorAll(`li[id]`)
      this.setS('hang',array.item(index).textContent)
      this.setState({focus:false})
    }
    i = -1
    onKey = key => {
      if(key === 'ArrowDown') {
        if(!this.state.focus) {this.setState({focus:true})}
        this.i++
        if(this.i >= this.state.hangs.length ) {
          this.i = -1
          //console.log(this.i)
        }
        this.setStyleToliElement(this.i)
      }
      else if(key === 'ArrowUp') {
        if(!this.state.focus) {this.setState({focus:true})}
        this.i--
        //console.log(this.i)
        if(this.i < -1 ) {
          this.i = this.state.hangs.length -1
          //console.log(this.i)
        }
        this.setStyleToliElement(this.i)
      }
      else if (key === 'Enter' ) {
        try 
        {
          if(this.i === -1) {
            alert('chưa chọn brand')
          }
          else {
            let array = document.querySelectorAll(`li[id]`)
            this.setS('hang',array.item(this.i).textContent)
            this.setS('focus',false)
          }
        } catch (error) {  }
      }
    }
    setStyleToliElement = i => {
      this.i = i
      let array = document.querySelectorAll('li[id]')
      try {
        
        array.forEach((val,index)=>{
          if(i === index) {
            val.style.color = 'red'
          }
          else {
            val.style.color = ''
          }
        })
      } catch (error) {
        //console.log(error)
        array.forEach((val,index)=>{
          val.style.color = ''
        })
      }
    }



    render() 
    {
      
      return (
        <div className="themSpFormContainBox">
          <div className="card col-md-6 col-12">
            <div >
              {/* hình ảnh  */}
              <div className="form">
                <input
                  type="file"
                  id={formfield.length }
                  onChange={(e) => {
                    this.ConvertImageTo64Url(e.target.files[0])
                  }}
                />

                <label className="lable-name">
                  <span className="content-name"> Hình ảnh </span>
                </label>
              </div>

              {/* Tên sản phẩm */}
              <div className="form" >
                <input onChange={e=>{ 
                  this.setS('ten',e.target.value) }} 
                />
                <label className="lable-name">
                  <span className="content-name"> Tên sản phẩm </span>
                </label>
              </div>

              {/* Hang */}
              <div className="form" >
                
                <input 
                id='thuongHieuInput' 
                autoComplete='off'
                value={this.state.hang}
                onClick={e=>{ this.setS('focus',true)  }}
                onChange={e => {
                  this.setS('hang',e.target.value) 
                }} 
                onFocus={e => {
                  this.setS('focus',true) 
                }}
                onBlur={e => {
                  setTimeout(() => {
                    this.setS('focus',false)
                  }, 100);
                }}
                onKeyUp={e => {
                  this.onKey(e.key)
                }}/>

                <label className="lable-name">
                  <span className="content-name"> Hãng </span>
                </label>
              </div>
              
              {/*  */}
              {
                this.state.focus ? (
                <div className="brand">
                  <ul>
                    {
                      this.state.hangs.map((val,i)=>{
                        //console.log(val)
                        return <li key={i}
                        id={i}
                        style={{cursor:'pointer'}}
                        onClick={e=>{ this.OnClickOnlistEle(i) }} 
                        onMouseOver={e=>{ this.setStyleToliElement(i) }}>
                          {val.brand.Brand}
                        </li>
                      })
                    }
                  </ul>
                </div>) 
                : (null)
              }

              {/* Button */}
              <div>
                <button className='btn btn-primary'
                
                onClick={e => {
                  this.UploadProduct()
                }}>
                  Upload
                </button>
              </div>
            </div>
          </div>

          <div className="rightside col-md-6 col-12">
            <div className="card">
              <div className="card-header">Review</div>
              <div className="card-body">
                <img alt="" src={this.state.hinh} style={{width:'50%'}} />
                <div>
                  <span>Tên mặt hàng</span>
                  <span>:</span>
                  <span style={{fontWeight:'bold'}}> {this.state.ten} </span>
                </div>
                <div>
                  <span>Hãng</span>
                  <span>:</span>
                  <span style={{fontWeight:'bold'}}> {this.state.hang} </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    }
  }



  class ListSP extends Component 
  {
    state = {

    }

    componentDidMount() {

    }

    render() {
      return (
        <>
          <div className="grid-contain">
            {[].map((val, i) => {
              return (
                <div key={i} className="grid-item">
                  <img
                    src={val}
                    style={{ width: "100%", height: "200px" }}
                    alt=""
                  />
                  <div>{i + 1}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-light"> {"<"} </button>
            <button className="btn btn-light">1</button>
            <button className="btn btn-light">2</button>
            <button className="btn btn-light"> {">"} </button>
          </div>
        </>
      );
    }
  }



  return (
    <>
      <hr />
      {props.state ? (
        <h3 className="text-center">Add Products</h3>
      ) : (
        <h3 className="text-center">List Products</h3>
      )}
      <hr />
      <div style={{ display: "flex" }}>
        <button
          onClick={(e) => {
            props.Themming();
          }}
          className="btn btn-outline-success"
          style={{ width: "100%" }}
        >
          +
        </button>
      </div>
      <hr />
      {props.state ? <FormAddSP  /> : <ListSP  />}
    </>
  );
}