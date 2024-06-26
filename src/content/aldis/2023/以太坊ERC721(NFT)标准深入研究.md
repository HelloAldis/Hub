---
author: Alids
publishDate: 2023-12-27
title: 以太坊ERC721(NFT)标准深入研究
excerpt: 详细探索以太坊NFT标准和实现细节，ERC721 一种用于非同质化代币（NFT）标准。定义了在以太坊区块链上创建和管理独特代币的标准接口。
image: ~/assets/images/aldis/2023/erc721.png
category: Web3
tags:
  - Ethereum
  - ERC721
  - ERC
  - solidity
  - Token
  - NFT
---

- [概述](#概述)
- [摘要](#摘要)
- [意义](#意义)
- [标准详解](#标准详解)
  - [`ERC721接口`](#erc721接口)
    - [`balanceOf`](#balanceof)
    - [`ownerOf`](#ownerof)
    - [`safeTransferFrom` 含`data`](#safetransferfrom-含data)
    - [`safeTransferFrom` 不含`data`](#safetransferfrom-不含data)
    - [`transferFrom`](#transferfrom)
    - [`approve`](#approve)
    - [`setApprovalForAll`](#setapprovalforall)
    - [`getApproved`](#getapproved)
    - [`isApprovedForAll`](#isapprovedforall)
  - [`ERC721TokenReceiver` 接口](#erc721tokenreceiver-接口)
    - [`onERC721Received`](#onerc721received)
  - [`ERC721Metadata` 接口](#erc721metadata-接口)
    - [`name`](#name)
    - [`symbol`](#symbol)
    - [`tokenURI`](#tokenuri)
  - [ERC721Enumerable](#erc721enumerable)
    - [`totalSupply`](#totalsupply)
    - [`tokenByIndex`](#tokenbyindex)
    - [`tokenOfOwnerByIndex`](#tokenofownerbyindex)
  - [事件](#事件)
    - [`Transfer`](#transfer)
    - [`Transfer`](#transfer-1)
    - [`Transfer`](#transfer-2)
- [详细实现](#详细实现)
  - [接口文件: `IERC721.sol`](#接口文件-ierc721sol)
  - [接口文件: `IERC721Enumerable.sol`](#接口文件-ierc721enumerablesol)
  - [接口文件: `IERC721Metadata.sol`](#接口文件-ierc721metadatasol)
  - [接口文件: `IERC721TokenReceiver.sol`](#接口文件-ierc721tokenreceiversol)
  - [实现文件: `NFToken.sol`](#实现文件-nftokensol)
  - [实现文件: `NFTokenEnumerable.sol`](#实现文件-nftokenenumerablesol)
  - [实现文件: `NFTokenMetadata.sol`](#实现文件-nftokenmetadatasol)
- [注意事项](#注意事项)
- [核心原理](#核心原理)
  - [“NFT” 命名选项](#nft-命名选项)
  - [NFT标识符](#nft标识符)
  - [转移机制](#转移机制)
  - [ERC165](#erc165)
  - [燃气和复杂性（关于可遍历扩展）](#燃气和复杂性关于可遍历扩展)
  - [关于隐私](#关于隐私)
  - [元数据选择（元数据扩展）](#元数据选择元数据扩展)
  - [兼容性](#兼容性)

## 概述

详细探索以太坊NFT标准和实现细节，`ERC721` 一种用于非同质化代币（NFT）标准。定义了在以太坊区块链上创建和管理独特代币的标准接口。与 `ERC20` 代币不同，每个 `ERC721` 代币都是唯一的，具有独特的标识符。这个标准使得数字和实物资产（如艺术品、房地产、游戏道具等）能够在区块链上以不可互换的形式表示和交易。

## 摘要

`ERC721` 标准允许在智能合约中实现NFT的标准API。该标准提供了基本功能，用于追踪和转移NFT。

考虑了NFT被个体拥有和交易的用例，以及将其委托给第三方经纪人/钱包/拍卖师（“运营商”）的情况。NFT可以代表对数字或实物资产的所有权。考虑了各种各样的资产，而且知道你会构想出许多更多的可能性：

实物财产 — 房屋、独特艺术品
虚拟收藏品 — 独特的小猫图片、可收藏的卡片
“负值”资产 — 贷款、负担和其他责任
总体而言，所有房屋都是独特的，没有两只小猫是相同的。NFT是可区分的，你必须单独跟踪每个的所有权。

## 意义

`ERC721` NFT 标准接口允许钱包/经纪人/拍卖应用与以太坊上的任何NFT进行交互，提供简单的 `ERC721` 智能合约，以及可以追踪任意数量NFT的合约。以下还讨论了其他应用。

`ERC20` 标准受到 `ERC20` 代币标准的启发，并借鉴了自 `ERC20` 创立以来两年的经验。 `ERC20` 无法用于追踪NFT，因为每个资产都是独特的（非同质化），而代币的数量中的每个都是相同的（同质化）。

`ERC721` 代表以太坊上的非同质化代币（NFT）标准，它具有以下重要意义：

- 独特性和个性化： `ERC721` 代币是唯一的，每个代币都具有独特的标识符。这种独特性使得 `ERC721` 非常适合代表个体、数字收藏品、艺术品等独一无二的资产。每个 `ERC721` 代币都有自己的身份，使其成为数字领域中个性化和独特性的象征。

- 数字艺术和收藏品： `ERC721` 为数字艺术品和收藏品提供了一个透明、不可篡改的记录。艺术家可以使用 `ERC721` 创建数字艺术品，确保每件作品都是唯一且易于追踪。收藏家可以确保其数字收藏品的真实性和所有权。

- 游戏和虚拟资产： 在游戏行业中， `ERC721` 代币可用于表示虚拟游戏物品、道具或角色。这使得这些虚拟资产能够在不同的游戏和平台之间进行交换和流通。玩家可以真正拥有并掌控其虚拟资产，而非仅限于特定游戏内部。

- 去中心化金融（DeFi）： `ERC721` 代币也可以在去中心化金融（DeFi）领域发挥作用。例如，将不动产的所有权用 `ERC721` 代币表示，使得房地产能够以分割、易于交易的形式在区块链上流通，进而促进了房地产领域的数字化。

- 社交媒体和数字身份： `ERC721` 代币可用于表示数字身份和社交媒体上的稀有徽章或特殊认证。用户可以在社交媒体上拥有、展示和证明自己的数字身份，并且这些身份信息是不可篡改的。

总体而言， `ERC721` 标准为数字领域提供了一种更广泛和个性化的资产表示方式，推动了区块链技术在艺术、游戏、金融等领域的创新和发展。

下文将详细探讨该标准与 `ERC20` 之间的差异。

## 标准详解

每个符合 NFT 合约都必须实现 `ERC721` 和 `ERC165` 接口，可选实现 `ERC721TokenReceiver `、`ERC721Metadata` 、 `ERC721Enumerable `接口。

### `ERC721接口`

在 `ERC721` 标准中需要注意几个概念:

- tokenId: 每一个tokenId都代表一个独一无二数字资产可以是数字藏品、也可以是游戏道具等
- owner: 数字资产得所有者，拥有者拥有数字资产得所有权
- operator：第三发操作员，此操作员可以代替NFT所有者，操作NFT包括转移、批准等，第三方操作员可以是账户地址也可以是合约地址（交易市场、钱包）

#### `balanceOf`

统计分配给所有者的所有NFT，返回传入的账户 `_owner` 的用户拥有的NFT个数，注意：

> 分配给零地址的NFT被视为无效，对于关于零地址的查询，此函数会抛出异常。

- 参数： `_owner` 账户地址
- 返回：拥有的NFT数量，可能为零

```solidity
function balanceOf(address _owner) external view returns (uint256);
```

#### `ownerOf`

查找NFT的所有者，返回传入的 `_tokenId` NFT 的拥有者账户 address，注意：

> 分配给零地址的NFT被视为无效，对于关于它们的查询会抛出异常。

- 参数： `_tokenId` NFT的标识符
- 返回：NFT所有者的地址

```solidity
function ownerOf(uint256 _tokenId) external view returns (address);
```

#### `safeTransferFrom` 含`data`

将NFT的所有权从一个地址转移到另一个地址, 注意：

> - 如果`msg.sender`不是是当前 `token` 所有者、已授权的操作员或NFT的批准地址，会抛出异常。
> - 如果`_from`不是当前所有者，将抛出异常。如果`_to`是零地址，将抛出异常。
> - 如果`_tokenId`不是有效的NFT，将抛出异常。
> - 转移完成后，此函数检查`_to`是否是智能合约（代码大小 > 0）。如果是，它调用`_to`上的`onERC721Received`，如果返回值不是`bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`，则抛出异常。。

- 参数： `_from` NFT的当前所有者
- 参数： `_to` 新所有者
- 参数： `_tokenId` 要转移的NFT
- 参数： `data` 无指定格式的附加数据，发送到`_to`合约的`onERC721Received`使用

```solidity
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
```

#### `safeTransferFrom` 不含`data`

将NFT的所有权从一个地址转移到另一个地址, 与上一个方法相同，只是此函数将数据 `data` 设置为""。

- 参数： `_from` NFT的当前所有者
- 参数： `_to` 新所有者
- 参数： `_tokenId` 要转移的NFT

```solidity
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
```

#### `transferFrom`

转移NFT的所有权 —— 调用者需要负责确认`_to`能够接收NFT，否则它们可能会永久丢失，注意：

> - 除非`msg.sender`是当前所有者、已授权的操作员或NFT的批准地址，否则会抛出异常。
> - 如果`_from`不是当前所有者，将抛出异常。
> - 如果`_to`是零地址，将抛出异常。
> - 如果`_tokenId`不是有效的NFT，将抛出异常。

- 参数： `_from` NFT的当前所有者
- 参数： `_to` 新所有者
- 参数： `_tokenId` 要转移的NFT

```solidity
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
```

#### `approve`

更改授权或确认NF给第三方（"操作员"）地址, 注意：

> - 零地址表示没有批准的地址。
> - 除非`msg.sender`是当前NFT所有者或当前所有者的已授权操作员，否则会抛出异常。

- 参数： `_approved` 被批准操作此NFT的第三方（"操作员"）的地址
- 参数： `_tokenId` 要批准给第三方（"操作员"）的NFT

```solidity
function approve(address _approved, uint256 _tokenId) external payable;
```

#### `setApprovalForAll`

启用或禁用第三方（"操作员"）管理所有`msg.sender`资产的批准, 注意：

> - 促出ApprovalForAll事件。
> - 合约必须允许一个所有者有多个操作员。

- 参数： `_operator` 被批准操作此NFT的账户或合约的地址
- 参数： `_approved` 要批准给以他账户或合约的NFT

```solidity
function setApprovalForAll(address _operator, bool _approved) external;
```

#### `getApproved`

获取单个NFT的批准的第三方（"操作员"）地址, 注意：

> - 如果`_tokenId`不是有效的NFT，将抛出异常。
> - 合约必须允许一个所有者有多个操作员。

- 参数： `_tokenId` 要查找的NFT
- 返回：此NFT的批准的第三方（"操作员"）地址，如果不存在则为零地址

```solidity
function getApproved(uint256 _tokenId) external view returns (address);
```

#### `isApprovedForAll`

查询地址是否是另一地址的授权操作员。

- 参数： `_owner` 拥有NFT的地址
- 参数： `_operator` 第三方（"操作员"）地址
- 返回： 如果`_operator`是`_owner`的已批准操作员，则为true，否则为false

```solidity
function getApproved(uint256 _tokenId) external view returns (address);
```

### `ERC721TokenReceiver` 接口

如果NFT钱包/经纪人/拍卖应用程序要接受安全转账，那么它必须实现钱包接口。

#### `onERC721Received`

处理接收NFT, `ERC721` 智能合约在`transfer`之后调用接收者的此函数。注意：

> - 此函数可以抛出异常以回滚并拒绝转账。
> - 返回值除了魔法值之外，必须导致事务被回滚。
> - 合约地址始终为消息发送方。

- 参数： `_operator` 调用`safeTransferFrom`函数的地址
- 参数： `_from` 先前拥有令牌的地址
- 参数： `_tokenId` 正在转移的NFT标识符
- 参数： `data` 动态格式的附加数据
- 返回： 返回 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`，除非抛出异常

```solidity
function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes _data) external returns(bytes4);
```

### `ERC721Metadata` 接口

元数据扩展对于 `ERC721` 智能合约是可选的。这使得可以查询NFT数字资产的详细描述信息。

#### `name`

此合约中NFT具体名称，例如“星昼数字藏品”

- 返回： NFT具体名称

```solidity
function name() external view returns (string _name);
```

#### `symbol`

此合约中NFT简称，例如“XZ”

- 返回： NFT简称

```solidity
function symbol() external view returns (string _symbol);
```

#### `tokenURI`

返回NFT资产的独特资源标识符（URI）， 如果`_tokenId`不是有效的NFT，则抛出异常。URI定义在RFC 3986中。URI可能指向符合"ERC721元数据JSON模式"的JSON文件。JSON schema如下：

```json
{
  "title": "Asset Metadata",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Identifies the asset to which this NFT represents"
    },
    "description": {
      "type": "string",
      "description": "Describes the asset to which this NFT represents"
    },
    "image": {
      "type": "string",
      "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
    }
  }
}
```

- 参数： `_tokenId` NFT
- 返回： NFT资产的独特资源标识符（URI）

```solidity
function tokenURI(uint256 _tokenId) external view returns (string);
```

### ERC721Enumerable

可遍历扩展对于 `ERC721` 智能合约是可选的，这允许你的合约发布其完整的NFT列表并使其可被发现。

#### `totalSupply`

统计此合约跟踪的NFT数量

- 返回： 此合约跟踪的有效NFT计数，其中每个NFT都具有已分配且可查询的所有者，且不等于零地址

```solidity
function totalSupply() external view returns (uint256);
```

#### `tokenByIndex`

枚举有效的NFT，注意：

> - 如果`_index` >= `totalSupply()`，则抛出异常。

- 参数： `_index` 计数器小于`totalSupply()`
- 返回： `_index` 对应 NFT的令牌标识符（排序顺序未指定）

```solidity
function tokenByIndex(uint256 _index) external view returns (uint256);
```

#### `tokenOfOwnerByIndex`

枚举所有者下的所有NFT，注意：

> - 如果`_index` >= `balanceOf(_owner)` 或者 `_owner` 是零地址（表示无效的NFT），则抛出异常。

- 参数： `_owner` 拥有的NFT的地址
- 参数： `_index` 计数器小于`balanceOf(_owner)`
- 返回： `_index` 对应分配给`_owner`的NFT标识符（排序顺序未指定）

```solidity
function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);
```

### 事件

#### `Transfer`

当任何NFT的所有权通过任何机制改变时，触发此事件。此事件在创建NFT时触发（`from` == 0）以及销毁NFT时触发（`to` == 0）。异常情况：在合约创建期间，可以创建和分配任意数量的NFT而不触发Transfer。在任何转移时，该NFT的批准地址（如果有）将重置为无。

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
```

#### `Transfer`

当NFT的批准地址更改或重新确认时触发此事件，零地址表示没有批准的地址。当Transfer事件触发时，这还表示该NFT的批准地址（如果有）将重置为无。

```solidity
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
```

#### `Transfer`

当为所有者启用或禁用操作员时触发此事件，该操作员可以管理所有者的所有NFT。

```solidity
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

## 详细实现

### 接口文件: `IERC721.sol`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 */

pragma solidity >=0.6.10 <0.8.20;

/**
 * @dev  `ERC721`  non-fungible token standard.
 */
interface IERC721
{

  /**
   * @dev Emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are
   * created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any
   * number of NFTs may be created and assigned without emitting Transfer. At the time of any
   * transfer, the approved address for that NFT (if any) is reset to none.
   */
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 indexed _tokenId
  );

  /**
   * @dev This emits when the approved address for an NFT is changed or reaffirmed. The zero
   * address indicates there is no approved address. When a Transfer event emits, this also
   * indicates that the approved address for that NFT (if any) is reset to none.
   */
  event Approval(
    address indexed _owner,
    address indexed _approved,
    uint256 indexed _tokenId
  );

  /**
   * @dev This emits when an operator is enabled or disabled for an owner. The operator can manage
   * all NFTs of the owner.
   */
  event ApprovalForAll(
    address indexed _owner,
    address indexed _operator,
    bool _approved
  );

  /**
   * @notice Throws unless `msg.sender` is the current owner, an authorized operator, or the
   * approved address for this NFT. Throws if `_from` is not the current owner. Throws if `_to` is
   * the zero address. Throws if `_tokenId` is not a valid NFT. When transfer is complete, this
   * function checks if `_to` is a smart contract (code size > 0). If so, it calls
   * `onERC721Received` on `_to` and throws if the return value is not
   * `bytes4(keccak256("onERC721Received(address,uint256,bytes)"))`.
   * @dev Transfers the ownership of an NFT from one address to another address. This function can
   * be changed to payable.
   * @param _from The current owner of the NFT.
   * @param _to The new owner.
   * @param _tokenId The NFT to transfer.
   * @param _data Additional data with no specified format, sent in call to `_to`.
   */
  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId,
    bytes calldata _data
  )
    external;

  /**
   * @notice This works identically to the other function with an extra data parameter, except this
   * function just sets data to ""
   * @dev Transfers the ownership of an NFT from one address to another address. This function can
   * be changed to payable.
   * @param _from The current owner of the NFT.
   * @param _to The new owner.
   * @param _tokenId The NFT to transfer.
   */
  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  )
    external;

  /**
   * @notice The caller is responsible to confirm that `_to` is capable of receiving NFTs or else
   * they may be permanently lost.
   * @dev Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
   * address for this NFT. Throws if `_from` is not the current owner. Throws if `_to` is the zero
   * address. Throws if `_tokenId` is not a valid NFT.  This function can be changed to payable.
   * @param _from The current owner of the NFT.
   * @param _to The new owner.
   * @param _tokenId The NFT to transfer.
   */
  function transferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  )
    external;

  /**
   * @notice The zero address indicates there is no approved address. Throws unless `msg.sender` is
   * the current NFT owner, or an authorized operator of the current owner.
   * @param _approved The new approved NFT controller.
   * @dev Set or reaffirm the approved address for an NFT. This function can be changed to payable.
   * @param _tokenId The NFT to approve.
   */
  function approve(
    address _approved,
    uint256 _tokenId
  )
    external;

  /**
   * @notice The contract MUST allow multiple operators per owner.
   * @dev Enables or disables approval for a third party ("operator") to manage all of
   * `msg.sender`'s assets. It also emits the ApprovalForAll event.
   * @param _operator Address to add to the set of authorized operators.
   * @param _approved True if the operators is approved, false to revoke approval.
   */
  function setApprovalForAll(
    address _operator,
    bool _approved
  )
    external;

  /**
   * @dev Returns the number of NFTs owned by `_owner`. NFTs assigned to the zero address are
   * considered invalid, and this function throws for queries about the zero address.
   * @notice Count all NFTs assigned to an owner.
   * @param _owner Address for whom to query the balance.
   * @return Balance of _owner.
   */
  function balanceOf(
    address _owner
  )
    external
    view
    returns (uint256);

  /**
   * @notice Find the owner of an NFT.
   * @dev Returns the address of the owner of the NFT. NFTs assigned to the zero address are
   * considered invalid, and queries about them do throw.
   * @param _tokenId The identifier for an NFT.
   * @return Address of _tokenId owner.
   */
  function ownerOf(
    uint256 _tokenId
  )
    external
    view
    returns (address);

  /**
   * @notice Throws if `_tokenId` is not a valid NFT.
   * @dev Get the approved address for a single NFT.
   * @param _tokenId The NFT to find the approved address for.
   * @return Address that _tokenId is approved for.
   */
  function getApproved(
    uint256 _tokenId
  )
    external
    view
    returns (address);

  /**
   * @notice Query if an address is an authorized operator for another address.
   * @dev Returns true if `_operator` is an approved operator for `_owner`, false otherwise.
   * @param _owner The address that owns the NFTs.
   * @param _operator The address that acts on behalf of the owner.
   * @return True if approved for all, false otherwise.
   */
  function isApprovedForAll(
    address _owner,
    address _operator
  )
    external
    view
    returns (bool);

}
```

### 接口文件: `IERC721Enumerable.sol`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 */

pragma solidity >=0.6.10 <0.8.20;

/**
 * @dev Optional enumeration extension for  `ERC721`  non-fungible token standard.
 */
interface IERC721Enumerable
{

  /**
   * @dev Returns a count of valid NFTs tracked by this contract, where each one of them has an
   * assigned and queryable owner not equal to the zero address.
   * @return Total supply of NFTs.
   */
  function totalSupply()
    external
    view
    returns (uint256);

  /**
   * @dev Returns the token identifier for the `_index`th NFT. Sort order is not specified.
   * @param _index A counter less than `totalSupply()`.
   * @return Token id.
   */
  function tokenByIndex(
    uint256 _index
  )
    external
    view
    returns (uint256);

  /**
   * @dev Returns the token identifier for the `_index`th NFT assigned to `_owner`. Sort order is
   * not specified. It throws if `_index` >= `balanceOf(_owner)` or if `_owner` is the zero address,
   * representing invalid NFTs.
   * @param _owner An address where we are interested in NFTs owned by them.
   * @param _index A counter less than `balanceOf(_owner)`.
   * @return Token id.
   */
  function tokenOfOwnerByIndex(
    address _owner,
    uint256 _index
  )
    external
    view
    returns (uint256);

}
```

### 接口文件: `IERC721Metadata.sol`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 */

pragma solidity >=0.6.10 <0.8.20;

/**
 * @dev Optional metadata extension for  `ERC721`  non-fungible token standard.
 */
interface IERC721Metadata
{

  /**
   * @dev Returns a descriptive name for a collection of NFTs in this contract.
   * @return _name Representing name.
   */
  function name()
    external
    view
    returns (string memory _name);

  /**
   * @dev Returns a abbreviated name for a collection of NFTs in this contract.
   * @return _symbol Representing symbol.
   */
  function symbol()
    external
    view
    returns (string memory _symbol);

  /**
   * @dev Returns a distinct Uniform Resource Identifier (URI) for a given asset. It Throws if
   * `_tokenId` is not a valid NFT. URIs are defined in RFC3986. The URI may point to a JSON file
   * that conforms to the "ERC721 Metadata JSON Schema".
   * @return URI of _tokenId.
   */
  function tokenURI(uint256 _tokenId)
    external
    view
    returns (string memory);

}
```

### 接口文件: `IERC721TokenReceiver.sol`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 */

pragma solidity >=0.6.10 <0.8.20;

/**
 * @dev  `ERC721`  interface for accepting safe transfers.
 */
interface IERC721TokenReceiver
{

  /**
   * @notice The contract address is always the message sender. A wallet/broker/auction application
   * MUST implement the wallet interface if it will accept safe transfers.
   * @dev Handle the receipt of a NFT. The ERC721 smart contract calls this function on the
   * recipient after a `transfer`. This function MAY throw to revert and reject the transfer. Return
   * of other than the magic value MUST result in the transaction being reverted.
   * Returns `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` unless throwing.
   * @param _operator The address which called `safeTransferFrom` function.
   * @param _from The address which previously owned the token.
   * @param _tokenId The NFT identifier which is being transferred.
   * @param _data Additional data with no specified format.
   * @return Returns `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
   */
  function onERC721Received(
    address _operator,
    address _from,
    uint256 _tokenId,
    bytes calldata _data
  )
    external
    returns(bytes4);

}
```

### 实现文件: `NFToken.sol`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 */

pragma solidity >=0.6.10 <0.8.20;

import "./IERC721.sol";
import "./IERC721TokenReceiver.sol";
import "../../util/ERC165/ERC165.sol";
import "../../util/AddressUtils.sol";

/**
 * @dev Implementation of  `ERC721`  non-fungible token standard.
 */
contract NFToken is
  IERC721,
  ERC165
{
  using AddressUtils for address;

  /**
   * @dev List of revert message codes. Implementing dApp should handle showing the correct message.
   * Based on 0xcert framework error codes.
   */
  string constant ZERO_ADDRESS = "003001";
  string constant NOT_VALID_NFT = "003002";
  string constant NOT_OWNER_OR_OPERATOR = "003003";
  string constant NOT_OWNER_APPROVED_OR_OPERATOR = "003004";
  string constant NOT_ABLE_TO_RECEIVE_NFT = "003005";
  string constant NFT_ALREADY_EXISTS = "003006";
  string constant NOT_OWNER = "003007";
  string constant IS_OWNER = "003008";

  /**
   * @dev Magic value of a smart contract that can receive NFT.
   * Equal to: bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")).
   */
  bytes4 internal constant MAGIC_ON_ERC721_RECEIVED = 0x150b7a02;

  /**
   * @dev A mapping from NFT ID to the address that owns it.
   */
  mapping (uint256 => address) internal idToOwner;

  /**
   * @dev Mapping from NFT ID to approved address.
   */
  mapping (uint256 => address) internal idToApproval;

   /**
   * @dev Mapping from owner address to count of their tokens.
   */
  mapping (address => uint256) private ownerToNFTokenCount;

  /**
   * @dev Mapping from owner address to mapping of operator addresses.
   */
  mapping (address => mapping (address => bool)) internal ownerToOperators;

  /**
   * @dev Guarantees that the msg.sender is an owner or operator of the given NFT.
   * @param _tokenId ID of the NFT to validate.
   */
  modifier canOperate(
    uint256 _tokenId
  )
  {
    address tokenOwner = idToOwner[_tokenId];
    require(
      tokenOwner == msg.sender || ownerToOperators[tokenOwner][msg.sender],
      NOT_OWNER_OR_OPERATOR
    );
    _;
  }

  /**
   * @dev Guarantees that the msg.sender is allowed to transfer NFT.
   * @param _tokenId ID of the NFT to transfer.
   */
  modifier canTransfer(
    uint256 _tokenId
  )
  {
    address tokenOwner = idToOwner[_tokenId];
    require(
      tokenOwner == msg.sender
      || idToApproval[_tokenId] == msg.sender
      || ownerToOperators[tokenOwner][msg.sender],
      NOT_OWNER_APPROVED_OR_OPERATOR
    );
    _;
  }

  /**
   * @dev Guarantees that _tokenId is a valid Token.
   * @param _tokenId ID of the NFT to validate.
   */
  modifier validNFToken(
    uint256 _tokenId
  )
  {
    require(idToOwner[_tokenId] != address(0), NOT_VALID_NFT);
    _;
  }

  /**
   * @dev Contract constructor.
   */
  constructor()
  {
    supportedInterfaces[0x80ac58cd] = true; // ERC721
  }

  /**
   * @notice Throws unless `msg.sender` is the current owner, an authorized operator, or the
   * approved address for this NFT. Throws if `_from` is not the current owner. Throws if `_to` is
   * the zero address. Throws if `_tokenId` is not a valid NFT. When transfer is complete, this
   * function checks if `_to` is a smart contract (code size > 0). If so, it calls
   * `onERC721Received` on `_to` and throws if the return value is not
   * `bytes4(keccak256("onERC721Received(address,uint256,bytes)"))`.
   * @dev Transfers the ownership of an NFT from one address to another address. This function can
   * be changed to payable.
   * @param _from The current owner of the NFT.
   * @param _to The new owner.
   * @param _tokenId The NFT to transfer.
   * @param _data Additional data with no specified format, sent in call to `_to`.
   */
  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId,
    bytes calldata _data
  )
    external
    override
  {
    _safeTransferFrom(_from, _to, _tokenId, _data);
  }

  /**
   * @notice This works identically to the other function with an extra data parameter, except this
   * function just sets data to "".
   * @dev Transfers the ownership of an NFT from one address to another address. This function can
   * be changed to payable.
   * @param _from The current owner of the NFT.
   * @param _to The new owner.
   * @param _tokenId The NFT to transfer.
   */
  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  )
    external
    override
  {
    _safeTransferFrom(_from, _to, _tokenId, "");
  }

  /**
   * @notice The caller is responsible to confirm that `_to` is capable of receiving NFTs or else
   * they may be permanently lost.
   * @dev Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
   * address for this NFT. Throws if `_from` is not the current owner. Throws if `_to` is the zero
   * address. Throws if `_tokenId` is not a valid NFT. This function can be changed to payable.
   * @param _from The current owner of the NFT.
   * @param _to The new owner.
   * @param _tokenId The NFT to transfer.
   */
  function transferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  )
    external
    override
    canTransfer(_tokenId)
    validNFToken(_tokenId)
  {
    address tokenOwner = idToOwner[_tokenId];
    require(tokenOwner == _from, NOT_OWNER);
    require(_to != address(0), ZERO_ADDRESS);

    _transfer(_to, _tokenId);
  }

  /**
   * @notice The zero address indicates there is no approved address. Throws unless `msg.sender` is
   * the current NFT owner, or an authorized operator of the current owner.
   * @dev Set or reaffirm the approved address for an NFT. This function can be changed to payable.
   * @param _approved Address to be approved for the given NFT ID.
   * @param _tokenId ID of the token to be approved.
   */
  function approve(
    address _approved,
    uint256 _tokenId
  )
    external
    override
    canOperate(_tokenId)
    validNFToken(_tokenId)
  {
    address tokenOwner = idToOwner[_tokenId];
    require(_approved != tokenOwner, IS_OWNER);

    idToApproval[_tokenId] = _approved;
    emit Approval(tokenOwner, _approved, _tokenId);
  }

  /**
   * @notice This works even if sender doesn't own any tokens at the time.
   * @dev Enables or disables approval for a third party ("operator") to manage all of
   * `msg.sender`'s assets. It also emits the ApprovalForAll event.
   * @param _operator Address to add to the set of authorized operators.
   * @param _approved True if the operators is approved, false to revoke approval.
   */
  function setApprovalForAll(
    address _operator,
    bool _approved
  )
    external
    override
  {
    ownerToOperators[msg.sender][_operator] = _approved;
    emit ApprovalForAll(msg.sender, _operator, _approved);
  }

  /**
   * @dev Returns the number of NFTs owned by `_owner`. NFTs assigned to the zero address are
   * considered invalid, and this function throws for queries about the zero address.
   * @param _owner Address for whom to query the balance.
   * @return Balance of _owner.
   */
  function balanceOf(
    address _owner
  )
    external
    override
    view
    returns (uint256)
  {
    require(_owner != address(0), ZERO_ADDRESS);
    return _getOwnerNFTCount(_owner);
  }

  /**
   * @dev Returns the address of the owner of the NFT. NFTs assigned to the zero address are
   * considered invalid, and queries about them do throw.
   * @param _tokenId The identifier for an NFT.
   * @return _owner Address of _tokenId owner.
   */
  function ownerOf(
    uint256 _tokenId
  )
    external
    override
    view
    returns (address _owner)
  {
    _owner = idToOwner[_tokenId];
    require(_owner != address(0), NOT_VALID_NFT);
  }

  /**
   * @notice Throws if `_tokenId` is not a valid NFT.
   * @dev Get the approved address for a single NFT.
   * @param _tokenId ID of the NFT to query the approval of.
   * @return Address that _tokenId is approved for.
   */
  function getApproved(
    uint256 _tokenId
  )
    external
    override
    view
    validNFToken(_tokenId)
    returns (address)
  {
    return idToApproval[_tokenId];
  }

  /**
   * @dev Checks if `_operator` is an approved operator for `_owner`.
   * @param _owner The address that owns the NFTs.
   * @param _operator The address that acts on behalf of the owner.
   * @return True if approved for all, false otherwise.
   */
  function isApprovedForAll(
    address _owner,
    address _operator
  )
    external
    override
    view
    returns (bool)
  {
    return ownerToOperators[_owner][_operator];
  }

  /**
   * @notice Does NO checks.
   * @dev Actually performs the transfer.
   * @param _to Address of a new owner.
   * @param _tokenId The NFT that is being transferred.
   */
  function _transfer(
    address _to,
    uint256 _tokenId
  )
    internal
    virtual
  {
    address from = idToOwner[_tokenId];
    _clearApproval(_tokenId);

    _removeNFToken(from, _tokenId);
    _addNFToken(_to, _tokenId);

    emit Transfer(from, _to, _tokenId);
  }

  /**
   * @notice This is an internal function which should be called from user-implemented external
   * mint function. Its purpose is to show and properly initialize data structures when using this
   * implementation.
   * @dev Mints a new NFT.
   * @param _to The address that will own the minted NFT.
   * @param _tokenId of the NFT to be minted by the msg.sender.
   */
  function _mint(
    address _to,
    uint256 _tokenId
  )
    internal
    virtual
  {
    require(_to != address(0), ZERO_ADDRESS);
    require(idToOwner[_tokenId] == address(0), NFT_ALREADY_EXISTS);

    _addNFToken(_to, _tokenId);

    emit Transfer(address(0), _to, _tokenId);
  }

  /**
   * @notice This is an internal function which should be called from user-implemented external burn
   * function. Its purpose is to show and properly initialize data structures when using this
   * implementation. Also, note that this burn implementation allows the minter to re-mint a burned
   * NFT.
   * @dev Burns a NFT.
   * @param _tokenId ID of the NFT to be burned.
   */
  function _burn(
    uint256 _tokenId
  )
    internal
    virtual
    validNFToken(_tokenId)
  {
    address tokenOwner = idToOwner[_tokenId];
    _clearApproval(_tokenId);
    _removeNFToken(tokenOwner, _tokenId);
    emit Transfer(tokenOwner, address(0), _tokenId);
  }

  /**
   * @notice Use and override this function with caution. Wrong usage can have serious consequences.
   * @dev Removes a NFT from owner.
   * @param _from Address from which we want to remove the NFT.
   * @param _tokenId Which NFT we want to remove.
   */
  function _removeNFToken(
    address _from,
    uint256 _tokenId
  )
    internal
    virtual
  {
    require(idToOwner[_tokenId] == _from, NOT_OWNER);
    ownerToNFTokenCount[_from] -= 1;
    delete idToOwner[_tokenId];
  }

  /**
   * @notice Use and override this function with caution. Wrong usage can have serious consequences.
   * @dev Assigns a new NFT to owner.
   * @param _to Address to which we want to add the NFT.
   * @param _tokenId Which NFT we want to add.
   */
  function _addNFToken(
    address _to,
    uint256 _tokenId
  )
    internal
    virtual
  {
    require(idToOwner[_tokenId] == address(0), NFT_ALREADY_EXISTS);

    idToOwner[_tokenId] = _to;
    ownerToNFTokenCount[_to] += 1;
  }

  /**
   * @dev Helper function that gets NFT count of owner. This is needed for overriding in enumerable
   * extension to remove double storage (gas optimization) of owner NFT count.
   * @param _owner Address for whom to query the count.
   * @return Number of _owner NFTs.
   */
  function _getOwnerNFTCount(
    address _owner
  )
    internal
    virtual
    view
    returns (uint256)
  {
    return ownerToNFTokenCount[_owner];
  }

  /**
   * @dev Actually perform the safeTransferFrom.
   * @param _from The current owner of the NFT.
   * @param _to The new owner.
   * @param _tokenId The NFT to transfer.
   * @param _data Additional data with no specified format, sent in call to `_to`.
   */
  function _safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId,
    bytes memory _data
  )
    private
    canTransfer(_tokenId)
    validNFToken(_tokenId)
  {
    address tokenOwner = idToOwner[_tokenId];
    require(tokenOwner == _from, NOT_OWNER);
    require(_to != address(0), ZERO_ADDRESS);

    _transfer(_to, _tokenId);

    if (_to.isContract())
    {
      bytes4 retval = IERC721TokenReceiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
      require(retval == MAGIC_ON_ERC721_RECEIVED, NOT_ABLE_TO_RECEIVE_NFT);
    }
  }

  /**
   * @dev Clears the current approval of a given NFT ID.
   * @param _tokenId ID of the NFT to be transferred.
   */
  function _clearApproval(
    uint256 _tokenId
  )
    private
  {
    delete idToApproval[_tokenId];
  }

}
```

### 实现文件: `NFTokenEnumerable.sol`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 */

pragma solidity >=0.6.10 <0.8.20;

import "./NFToken.sol";
import "./IERC721Enumerable.sol";

/**
 * @dev Optional enumeration implementation for  `ERC721`  non-fungible token standard.
 */
contract NFTokenEnumerable is
  NFToken,
  IERC721Enumerable
{

  /**
   * @dev List of revert message codes. Implementing dApp should handle showing the correct message.
   * Based on 0xcert framework error codes.
   */
  string constant INVALID_INDEX = "005007";

  /**
   * @dev Array of all NFT IDs.
   */
  uint256[] internal tokens;

  /**
   * @dev Mapping from token ID to its index in global tokens array.
   */
  mapping(uint256 => uint256) internal idToIndex;

  /**
   * @dev Mapping from owner to list of owned NFT IDs.
   */
  mapping(address => uint256[]) internal ownerToIds;

  /**
   * @dev Mapping from NFT ID to its index in the owner tokens list.
   */
  mapping(uint256 => uint256) internal idToOwnerIndex;

  /**
   * @dev Contract constructor.
   */
  constructor()
  {
    supportedInterfaces[0x780e9d63] = true; // ERC721Enumerable
  }

  /**
   * @dev Returns the count of all existing NFTokens.
   * @return Total supply of NFTs.
   */
  function totalSupply()
    external
    override
    view
    returns (uint256)
  {
    return tokens.length;
  }

  /**
   * @dev Returns NFT ID by its index.
   * @param _index A counter less than `totalSupply()`.
   * @return Token id.
   */
  function tokenByIndex(
    uint256 _index
  )
    external
    override
    view
    returns (uint256)
  {
    require(_index < tokens.length, INVALID_INDEX);
    return tokens[_index];
  }

  /**
   * @dev returns the n-th NFT ID from a list of owner's tokens.
   * @param _owner Token owner's address.
   * @param _index Index number representing n-th token in owner's list of tokens.
   * @return Token id.
   */
  function tokenOfOwnerByIndex(
    address _owner,
    uint256 _index
  )
    external
    override
    view
    returns (uint256)
  {
    require(_index < ownerToIds[_owner].length, INVALID_INDEX);
    return ownerToIds[_owner][_index];
  }

  /**
   * @notice This is an internal function which should be called from user-implemented external
   * mint function. Its purpose is to show and properly initialize data structures when using this
   * implementation.
   * @dev Mints a new NFT.
   * @param _to The address that will own the minted NFT.
   * @param _tokenId of the NFT to be minted by the msg.sender.
   */
  function _mint(
    address _to,
    uint256 _tokenId
  )
    internal
    override
    virtual
  {
    super._mint(_to, _tokenId);
    tokens.push(_tokenId);
    idToIndex[_tokenId] = tokens.length - 1;
  }

  /**
   * @notice This is an internal function which should be called from user-implemented external
   * burn function. Its purpose is to show and properly initialize data structures when using this
   * implementation. Also, note that this burn implementation allows the minter to re-mint a burned
   * NFT.
   * @dev Burns a NFT.
   * @param _tokenId ID of the NFT to be burned.
   */
  function _burn(
    uint256 _tokenId
  )
    internal
    override
    virtual
  {
    super._burn(_tokenId);

    uint256 tokenIndex = idToIndex[_tokenId];
    uint256 lastTokenIndex = tokens.length - 1;
    uint256 lastToken = tokens[lastTokenIndex];

    tokens[tokenIndex] = lastToken;

    tokens.pop();
    // This wastes gas if you are burning the last token but saves a little gas if you are not.
    idToIndex[lastToken] = tokenIndex;
    idToIndex[_tokenId] = 0;
  }

  /**
   * @notice Use and override this function with caution. Wrong usage can have serious consequences.
   * @dev Removes a NFT from an address.
   * @param _from Address from wich we want to remove the NFT.
   * @param _tokenId Which NFT we want to remove.
   */
  function _removeNFToken(
    address _from,
    uint256 _tokenId
  )
    internal
    override
    virtual
  {
    require(idToOwner[_tokenId] == _from, NOT_OWNER);
    delete idToOwner[_tokenId];

    uint256 tokenToRemoveIndex = idToOwnerIndex[_tokenId];
    uint256 lastTokenIndex = ownerToIds[_from].length - 1;

    if (lastTokenIndex != tokenToRemoveIndex)
    {
      uint256 lastToken = ownerToIds[_from][lastTokenIndex];
      ownerToIds[_from][tokenToRemoveIndex] = lastToken;
      idToOwnerIndex[lastToken] = tokenToRemoveIndex;
    }

    ownerToIds[_from].pop();
  }

  /**
   * @notice Use and override this function with caution. Wrong usage can have serious consequences.
   * @dev Assigns a new NFT to an address.
   * @param _to Address to wich we want to add the NFT.
   * @param _tokenId Which NFT we want to add.
   */
  function _addNFToken(
    address _to,
    uint256 _tokenId
  )
    internal
    override
    virtual
  {
    require(idToOwner[_tokenId] == address(0), NFT_ALREADY_EXISTS);
    idToOwner[_tokenId] = _to;

    ownerToIds[_to].push(_tokenId);
    idToOwnerIndex[_tokenId] = ownerToIds[_to].length - 1;
  }

  /**
   * @dev Helper function that gets NFT count of owner. This is needed for overriding in enumerable
   * extension to remove double storage(gas optimization) of owner NFT count.
   * @param _owner Address for whom to query the count.
   * @return Number of _owner NFTs.
   */
  function _getOwnerNFTCount(
    address _owner
  )
    internal
    override
    virtual
    view
    returns (uint256)
  {
    return ownerToIds[_owner].length;
  }
}
```

### 实现文件: `NFTokenMetadata.sol`

```solidity
/**
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 * @author: Aldis
 */

pragma solidity >=0.6.10 <0.8.20;

import "./NFToken.sol";
import "./IERC721Metadata.sol";

/**
 * @dev Optional metadata implementation for  `ERC721`  non-fungible token standard.
 */
contract NFTokenMetadata is
  NFToken,
  IERC721Metadata
{

  /**
   * @dev A descriptive name for a collection of NFTs.
   */
  string internal nftName;

  /**
   * @dev An abbreviated name for NFTokens.
   */
  string internal nftSymbol;

  /**
   * @dev Mapping from NFT ID to metadata uri.
   */
  mapping (uint256 => string) internal idToUri;

  /**
   * @notice When implementing this contract don't forget to set nftName and nftSymbol.
   * @dev Contract constructor.
   */
  constructor()
  {
    supportedInterfaces[0x5b5e139f] = true; // ERC721Metadata
  }

  /**
   * @dev Returns a descriptive name for a collection of NFTokens.
   * @return _name Representing name.
   */
  function name()
    external
    override
    view
    returns (string memory _name)
  {
    _name = nftName;
  }

  /**
   * @dev Returns an abbreviated name for NFTokens.
   * @return _symbol Representing symbol.
   */
  function symbol()
    external
    override
    view
    returns (string memory _symbol)
  {
    _symbol = nftSymbol;
  }

  /**
   * @dev A distinct URI (RFC 3986) for a given NFT.
   * @param _tokenId Id for which we want uri.
   * @return URI of _tokenId.
   */
  function tokenURI(
    uint256 _tokenId
  )
    external
    override
    view
    validNFToken(_tokenId)
    returns (string memory)
  {
    return _tokenURI(_tokenId);
  }

  /**
   * @notice This is an internal function that can be overriden if you want to implement a different
   * way to generate token URI.
   * @param _tokenId Id for which we want uri.
   * @return URI of _tokenId.
   */
  function _tokenURI(
    uint256 _tokenId
  )
    internal
    virtual
    view
    returns (string memory)
  {
    return idToUri[_tokenId];
  }

  /**
   * @notice This is an internal function which should be called from user-implemented external
   * burn function. Its purpose is to show and properly initialize data structures when using this
   * implementation. Also, note that this burn implementation allows the minter to re-mint a burned
   * NFT.
   * @dev Burns a NFT.
   * @param _tokenId ID of the NFT to be burned.
   */
  function _burn(
    uint256 _tokenId
  )
    internal
    override
    virtual
  {
    super._burn(_tokenId);

    delete idToUri[_tokenId];
  }

  /**
   * @notice This is an internal function which should be called from user-implemented external
   * function. Its purpose is to show and properly initialize data structures when using this
   * implementation.
   * @dev Set a distinct URI (RFC 3986) for a given NFT ID.
   * @param _tokenId Id for which we want URI.
   * @param _uri String representing RFC 3986 URI.
   */
  function _setTokenUri(
    uint256 _tokenId,
    string memory _uri
  )
    internal
    validNFToken(_tokenId)
  {
    idToUri[_tokenId] = _uri;
  }

}
```

## 注意事项

0.4.20版本的Solidity接口语法不足以表达 `ERC721` 标准。符合 `ERC721` 的合约必须遵循以下规定：

1. 上述接口为每个函数包含了明确的可变性保证。可变性保证的强度从弱到强分别为：可支付（payable）、隐式非支付（implicit nonpayable）、视图（view）和纯函数（pure）。你的实现必须满足此接口中规定的可变性保证，而且你可以满足更强的保证。例如，在你的合约中，此接口中的可支付函数可以被实现为非支付函数（未指定状态可变性）。预计未来Solidity版本将允许你的更严格的合约从此接口继承，但在0.4.20版本中的一个解决方法是，在从你的合约继承之前，你可以编辑此接口以添加更严格的可变性。

2. 实现 `ERC721Metadata` 或 `ERC721Enumerable` 的合约应该同时实现`ERC721`。 `ERC721` 实现了 `ERC165` 接口的要求。

3. 如果此规范中的函数显示为external，则合约遵循规范，即使它使用public可见性也是符合的。作为0.4.20版本的解决方法，你可以编辑此接口，在从你的合约继承之前，将其切换为public可见性。

4. Solidity将this.\*.selector的使用标记为警告，未来版本的Solidity将不再将其标记为错误。

如果Solidity的新版本允许在代码中表达这些注意事项，那么此EIP可能会更新并移除这些注意事项，这将等同于原始规范。

## 核心原理

以太坊智能合约有许多用途，这些用途依赖于跟踪数字化的资产。现有或计划中的NFT示例中包括Decentraland中的LAND，CryptoPunks中的同名恶搞作品，以及使用DMarket或EnjinCoin等系统的游戏物品。未来的用途包括跟踪现实世界的资产，如房地产（由Ubitquity或Propy等公司设想）。在所有这些情况下，关键问题是这些项目不应被视为账本中的数字，而是每个资产必须被单独且原子地跟踪其所有权。无论这些资产的性质如何，如果有一个标准化的接口，可以实现跨功能的资产管理和销售平台，生态系统将更加强大。

### “NFT” 命名选项

曾考虑的替代方案：可区分的资产、所有权证书、代币、资产、股权、门票来命名“NFT”，但最终选用 NFT 作为非同质化代币的称呼，是因为考虑其在数字化世界的通用性和广泛性，进行更高的抽象统一，创造更多的可能。

### NFT标识符

每个NFT在 `ERC721` 智能合约内部都由唯一的uint256 ID标识。这个标识号不得在合约的生命周期内更改。然后，对于以太坊链上的特定资产，（合约地址，uint256 tokenId）这一对将成为一个全局唯一且完全合格的标识符。虽然一些 `ERC721` 智能合约可能发现从ID 0开始，每个新的NFT只需递增一个是方便的，但调用者不得假设ID号具有任何特定的模式，必须将ID视为“黑匣子”。还要注意，NFT可能会变为无效（被销毁）。请参阅支持的枚举接口以获取支持的枚举函数。

选择uint256允许各种各样的应用，因为UUID和sha3哈希可以直接转换为uint256。

### 转移机制

`ERC721` 标准化了一个安全转移函数safeTransferFrom（具有和不具有bytes参数的重载版本）和一个不安全的函数transferFrom。可以通过以下方式发起转移：

- NFT的所有者
- NFT的批准地址
- NFT的当前所有者的授权操作员

此外，授权的操作员还可以设置NFT的批准地址。这为钱包、经纪和拍卖应用提供了一个强大的工具集，可以快速使用大量的NFT。

转移和接受NFT的合约仅指定在何种情况下交易必须抛出异常。你的实现也可以在其他情况下抛出异常。这使得实现能够实现有趣的结果：

- 如果合约已暂停，则禁止转移
- 从接收NFT的特定地址中列入黑名单
- 禁止不安全的转移 — transferFrom抛出异常，除非\_to等于msg.sender或\_countOf(\_to)为非零或先前非零（因为这些情况是安全的）。
- 对交易的双方收费 — 在使用非零的\_approved调用approve时要求支付费用，如果之前是零地址，使用零地址调用approve时退款，调用任何转移函数时要求支付费用，要求转移参数\_to等于msg.sender，要求转移参数\_to是NFT的批准地址。
- 只读NFT注册表 — 从safeTransferFrom、transferFrom、approve和setApprovalForAll中始终抛出异常。

失败的交易将抛出异常，这是ERC-223、ERC-677、ERC-827和OpenZeppelin的SafeERC20.sol实现中确定的最佳实践。ERC-20定义了一个授权功能，当调用后被修改为不同数量时，就会导致问题，例如OpenZeppelin的issue #438。在 `ERC721` 中，没有授权，因为每个NFT都是唯一的，其数量是零或一个。因此，在不会出现后来发现的问题的情况下，获得了ERC-20原始设计的优势。

NFT的创建（“铸造”）和销毁（“烧毁”）未包含在规范中。您的合约可以通过其他方式实现这些操作。请查看有关创建或销毁NFT时您的责任的事件文档。

对onERC721Received中的operator参数是否必要进行了质疑。在能够想象的所有情况中，如果操作员很重要，那么该操作员可以将代币转移到自己，然后发送它 - 然后他们将是from地址。这似乎是牵强的，因为认为操作员是代币的临时所有者（向自己转移是多余的）。当操作员发送代币时，是操作员根据自己的意愿行动，而不是代表代币持有人行动。这就是为什么操作员和先前的代币所有者对于代币接收者都是重要的原因。

曾考虑的替代方案：仅允许两步式的ERC-20样式交易，要求转移函数永不抛出异常，要求所有函数返回一个指示操作成功的布尔值。

### ERC165

选择使用标准接口检测（ERC-165）来公开 `ERC721` 智能合约支持的接口。

未来的EIP可能会创建一个全局的合约接口注册表。强烈支持这样的EIP，它将允许您的 `ERC721` 实现通过委托给一个单独的合约来实现ERC721Enumerable、ERC721Metadata或其他接口。

### 燃气和复杂性（关于可遍历扩展）

该规范考虑到管理少量和任意大量的NFT的实现。如果您的应用程序能够增长，那么请避免在您的代码中使用for/while循环（参见CryptoKitties悬赏问题＃4）。这些循环表明您的合约可能无法扩展，燃气成本将随时间无限上升。

已部署了一个合约，XXXXERC721，到Testnet，该合约实例化并跟踪340282366920938463463374607431768211456个不同的契约（2^128）。这足以将每个IPv6地址分配给以太坊账户所有者，或者跟踪尺寸为几微米的纳米机器人的所有权，总计占地球一半的大小。您可以从区块链查询它。并且每个功能的燃气消耗都比查询ENS低。

这个例子清楚地表明： `ERC721` 标准是可扩展的。

曾考虑的替代方案：如果资产枚举功能需要for循环，则删除该功能，从枚举功能返回Solidity数组类型。

### 关于隐私

钱包/经纪/拍卖商强烈需要确定所有者拥有的NFTs。不可遍历的NFTs用例中，比如其它无法遍历某个用户的资产。然而，由于攻击者可以简单地对每个可能的tokenId调用ownerOf，因此无法实现完全的隐私。

### 元数据选择（元数据扩展）

在元数据扩展中，要求有name和symbol函数。大部分代币EIP和草案（ERC-20、ERC-223、ERC-677、ERC-777、ERC-827）都包括这些函数。

提醒实现作者，如果你反对使用这种机制，空字符串是name和symbol的有效响应。提醒大家，任何智能合约都可以使用与你的合约相同的name和symbol。客户端如何确定哪些 `ERC721` 智能合约是众所周知不在这个标准规范的范围。

提供了一种将NFT与URI关联的机制。预计许多实现将利用这一点为每个NFT提供元数据。URI可以是可变的，考虑了一个NFT代表对一所房子的所有权，在这种情况下，有关房子的元数据（图像、居住者等）自然可以更改。

元数据作为字符串值返回。目前这只能在web3中调用，而不能从其他合约中调用。这是可以接受的，因为还没有考虑过在区块链应用程序中查询这些信息的用例。

可以考虑的替代方案：将每个资产的所有元数据都放在区块链上，公链太昂贵，但联盟链可行。

### 兼容性

采用了ERC-20规范中的`balanceOf`、`totalSupply`、`name`和`symbol`的语义。如果一个实现旨在更兼容ERC-20而支持此标准，它还可以包括一个返回`uint8(0)`的`decimals`函数。然而，认为要求所有 `ERC721` 实现都支持`decimals`函数是矫揉造作的。

目前以太坊上NFT实现的示例有：

- CryptoKitties – 与此标准的早期版本兼容。
- CryptoPunks – 部分ERC-20兼容，但不容易泛化，因为它直接在合同中包含拍卖功能，并使用显式引用资产为“punks”的函数名称。
- Auctionhouse Asset Interface – 作者需要Auctionhouse ÐApp（目前已冰封）的通用接口。他的“Asset”合同非常简单，但缺少ERC-20兼容性、`approve()`功能和元数据。

注意：“限量版、收藏品代币”（如Curio Cards和Rare Pepe）不是可区分资产。它们实际上是一组个别可替代代币，每个代币都由其自己的智能合同跟踪，具有自己的总供应量（在极端情况下可能为1）。

`onERC721Received`函数专门解决了旧的已部署合同可能在某些情况下无意中返回1（true）的问题，即使它们没有实现函数（请参阅Solidity DelegateCallReturnValue bug）。通过返回和检查一个魔术值，能够区分实际的肯定响应与这些虚无的`true`。
