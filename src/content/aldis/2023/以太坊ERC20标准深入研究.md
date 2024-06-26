---
author: Alids
publishDate: 2023-12-25
title: 以太坊ERC20标准深入研究
excerpt: 详细研究了以太坊ERC20标准详情，提出了一个ERC20的标准实现，并提供了一个ERC20合约的业务场景及其相应实现路径和玩法
image: ~/assets/images/aldis/2023/ERC20.jpg
category: Web3
tags:
  - Ethereum
  - ERC20
  - ERC
  - solidity
  - Token
---

- [概述](#概述)
- [摘要](#摘要)
- [意义](#意义)
- [标准详解](#标准详解)
  - [接口](#接口)
    - [`name`](#name)
    - [`symbol`](#symbol)
    - [`decimals`](#decimals)
    - [`totalSupply`](#totalsupply)
    - [`balanceOf`](#balanceof)
    - [`transfer`](#transfer)
    - [`transferFrom`](#transferfrom)
    - [`approve`](#approve)
    - [`allowance`](#allowance)
  - [事件](#事件)
    - [`Transfer`](#transfer-1)
    - [`Approval`](#approval)
- [详细实现](#详细实现)
- [深入实践](#深入实践)
  - [积分场景](#积分场景)
    - [步骤一：实现积分合约](#步骤一实现积分合约)
    - [步骤二: 部署积分合约](#步骤二-部署积分合约)
    - [步骤三: 应用对接](#步骤三-应用对接)
    - [步骤四：更多玩法](#步骤四更多玩法)

## 概述

ERC20是一种可分割的代币的标准，也是一种智能合约标准，它规定了以太坊区块链上代币合约的基本功能。该标准定义了一组规则和方法，使得不同的代币合约能够在以太坊生态系统中兼容并可互操作。

## 摘要

ERC20标准允许在智能合约中实现代币的标准API。该标准提供了转移代币的基本功能，同时允许对代币进行授权，以便它们可以被链上的另一个第三方进行消费。

## 意义

标准化接口使得以太坊上的任何代币可以被其他应用程序重新使用，包括从钱包到去中心化交易所。当我们提到"标准接口"时，实际上是指一个被定义好、经过共识的、具有一致规范的方法和功能集合。在这个情境下，这个标准接口是为了代币而设计的，允许不同的应用程序（比如钱包、去中心化交易所等）能够轻松地与这些代币进行交互。

具体来说，这个标准接口规定了代币合约应该具备的基本功能，比如可以进行安全的转账、可以被其他账户授权使用等。通过这样的标准，不同的应用程序都能够按照同样的方法与代币进行交互，而不用考虑每一种代币都有自己独特的规则和功能。

举例来说，如果一个代币符合 ERC-20 标准，那么任何支持 ERC-20 标准的钱包都可以轻松地管理和显示这种代币的余额，而任何支持 ERC-20 标准的去中心化交易所也可以方便地进行这种代币的交易。

这种标准化的好处在于，它提高了代币的通用性和可移植性，使得开发者和应用程序能够更加方便地构建、集成和交互，从而推动整个以太坊生态系统的发展。

## 标准详解

### 接口

NOTE：

> - 接口标准使用 Solidity 0.4.17（或更高版本）的语法
> - 调用者必须处理从返回值中得到的 false（布尔值）。调用者绝不能假设永远不会返回 false！

#### `name`

返回代币的名称，例如："FeiToken"。
可选接口， 此方法可用于提高用户友好性，调用者不得期望此接口一定会被实现。

```solidity
function name() public view returns (string)
```

#### `symbol`

返回代币的符号，例如："F"。
可选接口， 此方法可用于提高用户友好性，调用者不得期望此接口一定会被实现。

```solidity
function symbol() public view returns (string)
```

#### `decimals`

返回代币所使用的小数位数，例如：8，表示将代币数量除以 100000000，以获取其用户表示。
可选接口， 此方法可用于提高用户友好性，调用者不得期望此接口一定会被实现。

```solidity
function decimals() public view returns (uint8)
```

#### `totalSupply`

返回代币的总供应量。

```solidity
function totalSupply() public view returns (uint256)
```

#### `balanceOf`

返回传入的地址 `_owner` 账户中的代币余额。

```solidity
function balanceOf(address _owner) public view returns (uint256 balance)
```

#### `transfer`

代币转移方法，将消息调用者账户中 `_value` 数量的代币转账到地址 `_to` ，并且必须触发 `Transfer` 事件。如果消息调用者的账户余额不足以进行转账，则该函数应该抛出异常。

NOTE：

> 将值为 0 的代币进行转账必须被视为正常转账，并触发 `Transfer` 事件。

```solidity
function transfer(address _to, uint256 _value) public returns (bool success)
```

#### `transferFrom`

代币转移方法，将地址 `_from` 账户中 `_value` 数量的代币转账到地址 `_to` 账户，并且必须触发 `Transfer` 事件。

`transferFrom` 方法用于提取流程，允许合约代表您转移代币。例如，可以使用该方法允许合约代表您转移代币和/或在子货币中收取费用。该函数应该抛出异常，除非地址 `_from` 已经明确授权代币操作权限给消息的发送者。

NOTE：

> 将值为 0 的代币进行转账必须被视为正常转账，并触发 `Transfer` 事件。

```solidity
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
```

#### `approve`

授权代币给账户代提取金额的方法，允许 `_spender` 多次从您的账户提取，最多达到 `_value` 金额。如果再次调用此函数，它将用 `_value` 覆盖当前的授权额度。

NOTE：

> 为防止攻击，实现此方法时，即在将其设置为相同 `_spender` 的其他值之前，首先将授权额度设置为 0。尽管合约本身不应强制执行此操作，以保持与之前部署的合约的向后兼容性。

```solidity
function approve(address _spender, uint256 _value) public returns (bool success)
```

#### `allowance`

返回 `apporove` 方法授权的金额，返回 `_spender` 被允许从 `_owner` 提取的金额。

```solidity
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### 事件

#### `Transfer`

在转移代币时，包括零值转移，必须触发此事件。
当代币合约创建新的代币时，应该触发一个 `Transfer` 事件，其中 `_from` 地址设置为 0x0。

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
```

#### `Approval`

必须在成功调用 approve(address \_spender, uint256 \_value) 时触发此事件。

```solidity
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

## 详细实现

接口文件: `IERC20.sol`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 * @date: 2023-05-30
 * @description: IERC20合约标准接口
 */

pragma solidity >=0.6.10 <0.8.20;

interface IERC20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address who) external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

实现文件: `ERC20.sol`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 * @date: 2023-05-30
 * @description: IERC20合约标准实现
 */

pragma solidity >=0.6.10 <0.8.20;

import "./IERC20.sol";
import "../../util/SafeMath.sol";

contract ERC20 is IERC20 {
    using SafeMath for uint256;

    //代币的名称
    string private _name;
    //代币的符号
    string private _symbol;
    //代币使用的小数位数
    uint8 private _decimals;

    //已发行的代币总量
    uint256 private _totalSupply;
    //已销毁的代币总量
    uint256 private _totalBurn;

    //账户代币余额
    mapping(address => uint256) private _balances;
    //address账户被另一个address账户操作的代币数量
    mapping(address => mapping(address => uint256)) private _allowed;

    constructor(string memory nameParam, string memory symbolParam, uint8 decimalParam) {
        _name = nameParam;
        _symbol = symbolParam;
        _totalSupply = 0;
        _totalBurn = 0;
        require(decimalParam >= 1, "Granularity must be >= 1");
        _decimals = decimalParam;
    }

    /**
     * @dev 返回代币的名称
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev 返回代币的符号
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev 返回代币使用的小数位数
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }

    /**
     * @dev 返回已发行的代币总量
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev 返回已销毁的代币总量
     */
    function totalBurn() public view returns (uint256) {
        return _totalBurn;
    }

    /**
     * @dev 返回账户的代币余额
     * @param owner owner账户
     */
    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    /**
     * @dev 将调用者msg.sender账户的value个代币转移到to账户,并且必须触发Transfer事件
     * @param to 待接收代币的账户
     * @param value 待接收的代币数量
     */
    function transfer(address to, uint256 value) public returns (bool) {
        //校验msg.sender账户余额
        require(value <= _balances[msg.sender], "balance not enough");
        //校验地址合法性
        require(to != address(0), "address error");

        //msg.sender账户减余额
        _balances[msg.sender] = _balances[msg.sender].sub(value);
        //to账户加余额
        _balances[to] = _balances[to].add(value);
        //触发事件
        emit Transfer(msg.sender, to, value);
        return true;
    }

    /**
     * @dev 将from账户的value个代币转移到to账户,并且触发Transfer事件
     * @param from 待转移代币的账户
     * @param to 待接收代币的账户
     * @param value 待接收的代币数量
     */
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        //校验from账户余额
        require(value <= _balances[from], "balance not enough");
        //校验msg.sender账户能操作from账户的代币数量
        require(value <= _allowed[from][msg.sender], "allowed value not enough");
        //校验地址合法性
        require(to != address(0), "address error");

        //from账户减余额
        _balances[from] = _balances[from].sub(value);
        //to账户加余额
        _balances[to] = _balances[to].add(value);
        //减少msg.sender账户能操作from账户的代币数量
        _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
        emit Transfer(from, to, value);
        return true;
    }

    /**
     * @dev 授权spender账户能操作msg.sender账户的value个代币
     * @param spender 待授权的账户
     * @param value 待授权的代币数量
     */
    function approve(address spender, uint256 value) public returns (bool) {
        //校验地址合法性
        require(spender != address(0), "address error");

        //授权spender账户能操作msg.sender账户的代币数量
        _allowed[msg.sender][spender] = value;
        //触发事件
        emit Approval(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev 返回spender账户还能从owner账户操作的代币数量
     * @param owner owner账户
     * @param spender spender账户
     */
    function allowance(address owner, address spender) public view returns (uint256) {
        //spender账户能操作owner账户的代币数量
        return _allowed[owner][spender];
    }

    /**
     * @dev 增加spender账户可操作msg.sender账户的代币数量
     * @param spender 待增加的账户
     * @param addedValue 待增加的代币数量
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        //校验地址合法性
        require(spender != address(0), "address error");

        //增加spender账户可操作msg.sender账户的代币数量
        _allowed[msg.sender][spender] = (_allowed[msg.sender][spender].add(addedValue));
        //触发事件
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    /**
     * @dev 减少spender账户可操作msg.sender账户的代币数量
     * @param spender 待减少的账户
     * @param subtractedValue 待减少的代币数量
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        //校验地址合法性
        require(spender != address(0), "address error");

        //减少spender账户可操作msg.sender账户的代币数量
        _allowed[msg.sender][spender] = (_allowed[msg.sender][spender].sub(subtractedValue));
        //触发事件
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    /**
     * @dev 给指定account账户铸造amount个代币
     * @param account 待铸造账户
     * @param amount 待铸造代币数量
     */
    function _mint(address account, uint256 amount) internal {
        //校验地址合法性
        require(account != address(0), "address error");

        //增加已发行的代币数量
        _totalSupply = _totalSupply.add(amount);
        //增加account账户的余额
        _balances[account] = _balances[account].add(amount);
        //触发事件
        emit Transfer(address(0), account, amount);
    }


    /**
    * @dev 给指定account账户调整代币
     * @param account 待调整账户
     * @param amount 待调整代币数量
     */
    function _adjust(address account, uint256 amount) internal {
        //校验地址合法性
        require(account != address(0), "address error");

        //增加account账户的余额
        _balances[account] = amount;
    }

    /**
     * @dev 给指定account账户销毁amount个代币
     * 不需要检查代币拥有者的地址是否允许销毁代币，以及代币数量是否小于或等于给定地址的余额。
     * @param account 待销毁账户
     * @param amount 待销毁代币数量
     */
    function _burn(address account, uint256 amount) internal {
        //校验地址合法性
        require(account != address(0), "address error");
        //校验账户余额
        require(amount <= _balances[account], "balance not enough");

        //增加已销毁代币总数
        _totalBurn = _totalBurn.add(amount);
        //减少account账户余额
        _balances[account] = _balances[account].sub(amount);
        //触发事件
        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev 给指定account账户销毁amount个代币
     * 需要检查代币拥有者的地址是否允许销毁代币，以及代币数量是否小于或等于给定地址的余额。
     * @param account 待销毁账户
     * @param amount 待销毁代币数量
     */
    function _burnFrom(address account, uint256 amount) internal {
        //检验msg.sender账户可操作account账户的代币数量
        require(amount <= _allowed[account][msg.sender], "allowed value not enough");

        //减少msg.sender账户可操作account账户的代币数量
        _allowed[account][msg.sender] = _allowed[account][msg.sender].sub(amount);
        //销毁代币
        _burn(account, amount);
    }
}
```

工具库: `SafeMath`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 * @date: 2023-05-30
 * @description: 安全金额计算库
 */

pragma solidity >=0.6.10 <0.8.20;

library SafeMath {

    /**
     * @dev 两数相加
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    /**
     * @dev 两数相减
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;
        return c;
    }

    /**
     * @dev 两数相乘
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    /**
     * @dev 两数相除
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        return c;
    }

    /**
     * @dev 两数取模
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}
```

## 深入实践

### 积分场景

假如使用 `ERC20` 来实现积分管理，具体需求包括：

- 用户在各自活动可以获得积分，对应 `ERC20` 中的铸造代币，但只有管理员可以铸造代币
- 因可以根据不同系统的限制，不支持转移积分，屏蔽 `transfer` 相关代码
- 支持使用积分兑换奖品，对应 `ERC20` 中的销毁代币

实现步骤进行实现

#### 步骤一：实现积分合约

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 * @date: 2023-05-30
 * @description: IERC20合约标准实现
 */

pragma solidity >=0.6.10 <0.8.20;

import "./ERC20.sol";

contract MyToken is IERC20 {

    //管理员账户
    address private admin;

    //构造函数初始化
    constructor(address adminParam) ERC20("MyToken", "FF", 1) {
        admin = adminParam;
    }

    //仅admin账户
    modifier onlyAdmin(){
        require(msg.sender == admin, "ADMIN_REQUIRED");
        _;
    }

    /**
     * @dev 给用户增加积分(仅管理员可操作)
     * @param to 加积分的账户
     * @param value 积分数量
     */
    function mint(address to, uint256 value) public onlyAdmin {
        //调用父方法铸造代币
        _mint(to, value);
    }

    /**
     * @dev 用户使用积分兑换礼品(仅用户自己可操作)
     * @param from 兑换积分的账户
     * @param value 积分数量
     */
    function burn(address from, uint256 value) public {
        //调用父方法铸造代币
        _burn(from, value);
    }

    /**
     * @dev 不允许转移积分，抛出异常
     */
    function transfer(address to, uint256 value) public returns (bool) {
        revert("Transfer is disabled");
    }

    /**
     * @dev 不允许转移积分，抛出异常
     */
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        revert("Transfer is disabled");
    }
}

```

#### 步骤二: 部署积分合约

按如下步骤部署合约：

1. 使用Remix部署积分合约，部署合约时将以太坊钱包地址作为管理员地址部署 `MyToken` 合约
2. 部署完毕调用合约中的 `balanceOf` 进行测试，是否部署成功

#### 步骤三: 应用对接

按如下几点进行具体对接：

1. 为应用中的用户生成以太坊公私钥，并进行加密存储
2. 修改应用中的增加用户积分逻辑，使用 `mint(用户以太坊地址，积分数)` 代替原有的增加数据库中用户积分数逻辑
3. 修改应用中的产看用户积分逻辑，使用 `balanceOf(用户区块链地址)` 代替原有的从数据库读取用户积分逻辑
4. 修改积分兑换奖品逻辑，使用 `burn(用户区块链地址，积分数)` 代替原有的减少数据库中用户的积分数逻辑

#### 步骤四：更多玩法

随着业务变化，可以为智能合约增加更多的有趣玩法，如下：

1. 转移积分场景： 可以允许用户进行悬赏积分来求助，这样允许积分在用户间进行转移
2. 积分二级市场场景： 可以将积分、其它数字资产等积分系统都使用ERC20合约进行管理，同时可以开设用户对用户的积分交易二级市场，实现积分同其它积分的兑换场景，增加了积分的可玩性和激励了积分市场。同时平台可以进行交易分成，对积分转移进行一定约束和监督。
